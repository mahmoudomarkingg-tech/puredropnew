'use strict';

const jwt = require('jsonwebtoken');

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET must be set in the .env file');
  }
  return secret;
}

function authenticateToken(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const queryToken = typeof req.query.token === 'string' ? req.query.token : '';
    const bearerToken = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
    const token = bearerToken || queryToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'يلزم تسجيل الدخول: لم يتم إرسال توكن صالح'
      });
    }

    const payload = jwt.verify(token, getJwtSecret());
    req.admin = {
      id: payload.sub || payload.id || null,
      username: payload.username
    };
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'التوكن غير صالح أو منتهي الصلاحية'
    });
  }
}

module.exports = {
  authenticateToken,
  getJwtSecret
};
