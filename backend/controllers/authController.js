'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { get } = require('../db/query');
const { getJwtSecret } = require('../middleware/auth');
const { sanitizeText } = require('../utils/helpers');

async function login(req, res) {
  const username = sanitizeText(req.body?.username || req.body?.email, 120);
  const password = String(req.body?.password || '');

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: 'اسم المستخدم وكلمة المرور مطلوبان'
    });
  }

  const admin = await get(
    `SELECT id, username, password_hash
     FROM admins
     WHERE username = ?`,
    [username]
  );

  if (!admin) {
    return res.status(401).json({
      success: false,
      error: 'بيانات الدخول غير صحيحة'
    });
  }

  const matched = await bcrypt.compare(password, admin.password_hash);
  if (!matched) {
    return res.status(401).json({
      success: false,
      error: 'بيانات الدخول غير صحيحة'
    });
  }

  const expiresIn = process.env.JWT_EXPIRES_IN || '8h';
  const token = jwt.sign(
    { username: admin.username },
    getJwtSecret(),
    { subject: String(admin.id), expiresIn }
  );

  return res.json({
    success: true,
    token,
    expiresIn,
    admin: {
      id: admin.id,
      username: admin.username
    }
  });
}

async function me(req, res) {
  return res.json({
    success: true,
    admin: req.admin
  });
}

module.exports = {
  login,
  me
};
