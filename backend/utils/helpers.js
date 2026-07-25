'use strict';

const {
  ORDER_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
  PAYMENT_METHOD_LABELS,
  DELIVERY_TIME_LABELS,
  DELIVERY_STATUS_VALUES
} = require('./constants');

function sanitizeText(value, maxLength = 1000) {
  if (value === undefined || value === null) return '';
  return String(value).trim().slice(0, maxLength);
}

function normalizePhone(phone) {
  return sanitizeText(phone, 32).replace(/\s+/g, '');
}

function isValidJordanPhone(phone) {
  return /^07\d{8,9}$/.test(phone);
}

function money(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

function translateOrderStatus(status) {
  return ORDER_STATUS_LABELS[status] || status || 'غير محدد';
}

function translatePaymentStatus(status) {
  return PAYMENT_STATUS_LABELS[status] || status || 'غير محدد';
}

function translatePaymentMethod(method) {
  return PAYMENT_METHOD_LABELS[method] || method || 'غير محدد';
}

function translateDeliveryTime(value) {
  return DELIVERY_TIME_LABELS[value] || value || 'غير محدد';
}

function normalizeDeliveryStatus(value) {
  const cleaned = sanitizeText(value, 80);
  if (!cleaned) return null;
  if (DELIVERY_STATUS_VALUES.has(cleaned)) return cleaned;

  const normalized = cleaned.toLowerCase();
  if (['delivered', 'yes', 'true', '1', 'نعم', 'تم'].includes(normalized)) return 'تم التسليم';
  if (['not_delivered', 'not delivered', 'no', 'false', '0', 'لا'].includes(normalized)) return 'لم يتم التسليم';

  return null;
}

function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  sanitizeText,
  normalizePhone,
  isValidJordanPhone,
  money,
  translateOrderStatus,
  translatePaymentStatus,
  translatePaymentMethod,
  translateDeliveryTime,
  normalizeDeliveryStatus,
  asyncHandler
};
