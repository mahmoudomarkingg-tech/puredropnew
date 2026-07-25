'use strict';

const rateLimit = require('express-rate-limit');

function loginRateLimiter() {
  const windowMs = Number(process.env.LOGIN_RATE_WINDOW_MS || 15 * 60 * 1000);
  const max = Number(process.env.LOGIN_RATE_MAX || 20);

  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: 'محاولات تسجيل دخول كثيرة. حاول مرة أخرى بعد قليل.'
    }
  });
}

function apiRateLimiter() {
  const windowMs = Number(process.env.API_RATE_WINDOW_MS || 60 * 1000);
  const max = Number(process.env.API_RATE_MAX || 180);

  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: 'طلبات كثيرة جداً. حاول لاحقاً.'
    }
  });
}

module.exports = {
  loginRateLimiter,
  apiRateLimiter
};
