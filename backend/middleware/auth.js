'use strict';

const jwt = require('jsonwebtoken');

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET must be set in the .env file');
  }
  return secret;
}

function readBearerToken(req) {
  const header = req.headers.authorization || '';
  const queryToken = typeof req.query.token === 'string' ? req.query.token : '';
  const bearerToken = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  return bearerToken || queryToken;
}

function authenticateToken(req, res, next) {
  try {
    const token = readBearerToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'يلزم تسجيل الدخول: لم يتم إرسال توكن صالح'
      });
    }

    const payload = jwt.verify(token, getJwtSecret());
    if (payload.role === 'customer' || payload.role === 'staff') {
      return res.status(403).json({
        success: false,
        error: 'هذا التوكن غير مسموح للوحة الإدارة'
      });
    }
    req.admin = {
      id: payload.sub || payload.id || null,
      username: payload.username,
      role: payload.role || 'admin'
    };
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'التوكن غير صالح أو منتهي الصلاحية'
    });
  }
}

function authenticateStaff(req, res, next) {
  try {
    const token = readBearerToken(req);
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'يلزم تسجيل دخول الموظف'
      });
    }

    const payload = jwt.verify(token, getJwtSecret());
    if (payload.role !== 'staff') {
      return res.status(403).json({
        success: false,
        error: 'هذا الحساب ليس حساب موظف توصيل'
      });
    }

    req.staff = {
      id: payload.sub || 'staff',
      username: payload.username || 'staff',
      role: 'staff'
    };
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'جلسة الموظف غير صالحة أو منتهية'
    });
  }
}

function authenticateCustomer(req, res, next) {
  try {
    const token = readBearerToken(req);
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'يلزم تسجيل الدخول بحساب Google أولاً'
      });
    }

    const payload = jwt.verify(token, getJwtSecret());
    if (payload.role !== 'customer') {
      return res.status(403).json({
        success: false,
        error: 'توكن غير صالح للعميل'
      });
    }

    req.customer = {
      id: Number(payload.sub) || null,
      email: payload.email || null,
      name: payload.name || null
    };
    if (!req.customer.id) {
      return res.status(401).json({ success: false, error: 'توكن العميل غير صالح' });
    }
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'انتهت جلسة العميل. سجّل الدخول عبر Google مجدداً'
    });
  }
}

function optionalCustomer(req, res, next) {
  try {
    const token = readBearerToken(req);
    if (!token) return next();
    const payload = jwt.verify(token, getJwtSecret());
    if (payload.role === 'customer' && payload.sub) {
      req.customer = {
        id: Number(payload.sub) || null,
        email: payload.email || null,
        name: payload.name || null
      };
    }
  } catch {
    // ignore invalid optional token
  }
  return next();
}

module.exports = {
  authenticateToken,
  authenticateStaff,
  authenticateCustomer,
  optionalCustomer,
  getJwtSecret
};
