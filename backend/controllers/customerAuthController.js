'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const { get, run } = require('../db/query');
const { getJwtSecret } = require('../middleware/auth');
const {
  sanitizeText,
  normalizePhone,
  isValidJordanPhone
} = require('../utils/helpers');
const { getBalancesForPhone } = require('../services/couponsService');

function getGoogleClientId() {
  return String(process.env.GOOGLE_CLIENT_ID || '').trim();
}

function allowDemoGoogleLogin() {
  const flag = String(process.env.ALLOW_DEMO_GOOGLE_LOGIN || '').toLowerCase();
  if (flag === 'true' || flag === '1') return true;
  // Local/dev convenience when Google Client ID is not configured yet.
  const env = String(process.env.NODE_ENV || '').toLowerCase();
  return !getGoogleClientId() && env !== 'production';
}

function normalizeEmail(value) {
  return sanitizeText(String(value || '').toLowerCase(), 200);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function signCustomerToken(user) {
  return jwt.sign(
    {
      role: 'customer',
      sub: user.id,
      email: user.email,
      name: user.fullName
    },
    getJwtSecret(),
    { expiresIn: process.env.CUSTOMER_JWT_EXPIRES_IN || process.env.JWT_EXPIRES_IN || '30d' }
  );
}

async function upsertGoogleUser({ googleSub, email, fullName, avatarUrl }) {
  const existing = await get(
    `SELECT id, google_sub AS "googleSub", email, full_name AS "fullName",
            avatar_url AS "avatarUrl", phone
     FROM customer_users WHERE google_sub = ?`,
    [googleSub]
  );

  if (existing) {
    await run(
      `UPDATE customer_users
       SET email = ?, full_name = COALESCE(?, full_name), avatar_url = COALESCE(?, avatar_url),
           updated_at = NOW()
       WHERE id = ?`,
      [email, fullName || null, avatarUrl || null, existing.id]
    );
    return get(
      `SELECT id, google_sub AS "googleSub", email, full_name AS "fullName",
              avatar_url AS "avatarUrl", phone
       FROM customer_users WHERE id = ?`,
      [existing.id]
    );
  }

  const inserted = await run(
    `INSERT INTO customer_users (google_sub, email, full_name, avatar_url)
     VALUES (?, ?, ?, ?)
     RETURNING id, google_sub AS "googleSub", email, full_name AS "fullName",
               avatar_url AS "avatarUrl", phone`,
    [googleSub, email, fullName || null, avatarUrl || null]
  );
  return inserted.rows[0];
}

async function attachCoupons(user) {
  if (!user?.phone) {
    return { ...user, coupons: [] };
  }
  const coupons = await getBalancesForPhone(user.phone);
  return { ...user, coupons };
}

async function getAuthConfig(req, res) {
  const clientId = getGoogleClientId();
  return res.json({
    success: true,
    googleClientId: clientId || null,
    googleEnabled: Boolean(clientId),
    demoLoginEnabled: allowDemoGoogleLogin(),
    emailAuthEnabled: true
  });
}

async function registerWithEmail(req, res) {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || '');
  const fullName = sanitizeText(req.body?.fullName || req.body?.name || '', 160);
  const phoneRaw = req.body?.phone;

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, error: 'أدخل بريداً إلكترونياً صالحاً' });
  }
  if (password.length < 6) {
    return res.status(400).json({ success: false, error: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' });
  }
  if (!fullName) {
    return res.status(400).json({ success: false, error: 'الاسم مطلوب لإنشاء الحساب' });
  }

  let phone = null;
  if (phoneRaw) {
    phone = normalizePhone(phoneRaw);
    if (phone && !isValidJordanPhone(phone)) {
      return res.status(400).json({
        success: false,
        error: 'رقم الهاتف يجب أن يبدأ بـ 07 ويتكون من 10 أو 11 رقماً'
      });
    }
  }

  const existing = await get(
    `SELECT id, password_hash AS "passwordHash", google_sub AS "googleSub"
     FROM customer_users WHERE LOWER(email) = ?`,
    [email]
  );
  if (existing) {
    return res.status(409).json({
      success: false,
      error: existing.googleSub && !existing.passwordHash
        ? 'هذا البريد مسجّل عبر Google. استخدم زر Google للدخول'
        : 'يوجد حساب بهذا البريد مسبقاً — جرّب تسجيل الدخول'
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const inserted = await run(
    `INSERT INTO customer_users (google_sub, email, full_name, avatar_url, phone, password_hash)
     VALUES (NULL, ?, ?, NULL, ?, ?)
     RETURNING id, google_sub AS "googleSub", email, full_name AS "fullName",
               avatar_url AS "avatarUrl", phone`,
    [email, fullName, phone, passwordHash]
  );
  const user = inserted.rows[0];
  const withCoupons = await attachCoupons(user);
  const token = signCustomerToken(user);
  return res.status(201).json({ success: true, token, customer: withCoupons });
}

async function loginWithEmail(req, res) {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || '');

  if (!isValidEmail(email) || !password) {
    return res.status(400).json({ success: false, error: 'أدخل البريد وكلمة المرور' });
  }

  const row = await get(
    `SELECT id, google_sub AS "googleSub", email, full_name AS "fullName",
            avatar_url AS "avatarUrl", phone, password_hash AS "passwordHash"
     FROM customer_users WHERE LOWER(email) = ?`,
    [email]
  );
  if (!row) {
    return res.status(401).json({ success: false, error: 'بيانات الدخول غير صحيحة' });
  }
  if (!row.passwordHash) {
    return res.status(400).json({
      success: false,
      error: row.googleSub
        ? 'هذا الحساب عبر Google فقط — استخدم زر المتابعة مع Google'
        : 'لا يمكن الدخول بهذا الحساب. أنشئ حساباً جديداً بالبريد'
    });
  }

  const matched = await bcrypt.compare(password, row.passwordHash);
  if (!matched) {
    return res.status(401).json({ success: false, error: 'بيانات الدخول غير صحيحة' });
  }

  const user = {
    id: row.id,
    googleSub: row.googleSub,
    email: row.email,
    fullName: row.fullName,
    avatarUrl: row.avatarUrl,
    phone: row.phone
  };
  const withCoupons = await attachCoupons(user);
  const token = signCustomerToken(user);
  return res.json({ success: true, token, customer: withCoupons });
}

async function googleLogin(req, res) {
  const credential = sanitizeText(req.body?.credential || req.body?.idToken, 5000);
  const clientId = getGoogleClientId();

  if (!clientId) {
    return res.status(503).json({
      success: false,
      error: 'تسجيل Google غير مفعّل. أضف GOOGLE_CLIENT_ID في ملف .env'
    });
  }
  if (!credential) {
    return res.status(400).json({ success: false, error: 'رمز Google غير موجود' });
  }

  try {
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId
    });
    const payload = ticket.getPayload() || {};
    if (!payload.sub || !payload.email) {
      return res.status(401).json({ success: false, error: 'تعذر التحقق من حساب Google' });
    }

    const user = await upsertGoogleUser({
      googleSub: payload.sub,
      email: payload.email,
      fullName: payload.name || payload.email,
      avatarUrl: payload.picture || null
    });
    const withCoupons = await attachCoupons(user);
    const token = signCustomerToken(user);

    return res.json({
      success: true,
      token,
      customer: withCoupons
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'فشل تسجيل الدخول عبر Google. حاول مرة أخرى'
    });
  }
}

async function demoGoogleLogin(req, res) {
  if (!allowDemoGoogleLogin()) {
    return res.status(403).json({
      success: false,
      error: 'الدخول التجريبي غير متاح. استخدم Google الحقيقي عبر GOOGLE_CLIENT_ID'
    });
  }

  const email = sanitizeText(req.body?.email || 'customer@gmail.com', 200).toLowerCase();
  const fullName = sanitizeText(req.body?.name || 'عميل Google', 160);
  const googleSub = `demo-google-${Buffer.from(email).toString('hex').slice(0, 24)}`;

  const user = await upsertGoogleUser({
    googleSub,
    email,
    fullName,
    avatarUrl: null
  });
  const withCoupons = await attachCoupons(user);
  const token = signCustomerToken(user);

  return res.json({
    success: true,
    token,
    customer: withCoupons,
    demo: true
  });
}

async function getMe(req, res) {
  const user = await get(
    `SELECT id, google_sub AS "googleSub", email, full_name AS "fullName",
            avatar_url AS "avatarUrl", phone
     FROM customer_users WHERE id = ?`,
    [req.customer.id]
  );
  if (!user) {
    return res.status(404).json({ success: false, error: 'الحساب غير موجود' });
  }
  return res.json({ success: true, customer: await attachCoupons(user) });
}

async function updateMe(req, res) {
  const phoneRaw = req.body?.phone;
  const fullName = sanitizeText(req.body?.fullName || req.body?.name, 160);
  const updates = [];
  const params = [];

  if (fullName) {
    updates.push('full_name = ?');
    params.push(fullName);
  }

  if (phoneRaw !== undefined) {
    const phone = normalizePhone(phoneRaw);
    if (phone && !isValidJordanPhone(phone)) {
      return res.status(400).json({
        success: false,
        error: 'رقم الهاتف يجب أن يبدأ بـ 07 ويتكون من 10 أو 11 رقماً'
      });
    }
    updates.push('phone = ?');
    params.push(phone || null);
  }

  if (!updates.length) {
    return res.status(400).json({ success: false, error: 'لا توجد بيانات للتحديث' });
  }

  updates.push('updated_at = NOW()');
  params.push(req.customer.id);

  await run(`UPDATE customer_users SET ${updates.join(', ')} WHERE id = ?`, params);

  const user = await get(
    `SELECT id, google_sub AS "googleSub", email, full_name AS "fullName",
            avatar_url AS "avatarUrl", phone
     FROM customer_users WHERE id = ?`,
    [req.customer.id]
  );

  return res.json({ success: true, customer: await attachCoupons(user) });
}

module.exports = {
  getAuthConfig,
  googleLogin,
  demoGoogleLogin,
  registerWithEmail,
  loginWithEmail,
  getMe,
  updateMe
};
