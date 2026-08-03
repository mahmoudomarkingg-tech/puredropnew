'use strict';

const {
  sanitizeText,
  normalizePhone,
  isValidJordanPhone
} = require('../utils/helpers');
const {
  getBalancesForPhone,
  listAccounts,
  getAccountLedger,
  adminAdjustAccount,
  getOrCreateAccount,
  DIGITAL_COUPON_PACKS,
  serviceLabel
} = require('../services/couponsService');
const { run } = require('../db/query');
const { broadcastAdminEvent } = require('../utils/sse');

async function getPublicBalance(req, res) {
  const phone = normalizePhone(req.query.phone || req.body?.phone);
  if (!isValidJordanPhone(phone)) {
    return res.status(400).json({ success: false, error: 'رقم الهاتف غير صالح' });
  }

  const accounts = await getBalancesForPhone(phone);
  return res.json({
    success: true,
    phone,
    accounts,
    packs: Object.entries(DIGITAL_COUPON_PACKS).map(([productId, meta]) => ({
      productId: Number(productId),
      ...meta,
      serviceLabel: serviceLabel(meta.serviceType)
    }))
  });
}

async function listAdminCouponAccounts(req, res) {
  const q = sanitizeText(req.query.q, 80);
  const accounts = await listAccounts({ q, limit: Number(req.query.limit) || 150 });
  const totals = accounts.reduce(
    (acc, row) => {
      acc.remaining += Number(row.remaining) || 0;
      acc.issued += Number(row.totalIssued) || 0;
      acc.redeemed += Number(row.totalRedeemed) || 0;
      return acc;
    },
    { remaining: 0, issued: 0, redeemed: 0 }
  );

  return res.json({
    success: true,
    accounts,
    counts: {
      accounts: accounts.length,
      ...totals
    },
    generatedAt: new Date().toISOString()
  });
}

async function getAdminCouponLedger(req, res) {
  const accountId = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(accountId) || accountId <= 0) {
    return res.status(400).json({ success: false, error: 'معرّف الحساب غير صالح' });
  }
  const ledger = await getAccountLedger(accountId, Number(req.query.limit) || 80);
  return res.json({ success: true, accountId, ledger });
}

async function adjustAdminCouponAccount(req, res) {
  const accountId = Number.parseInt(req.params.id, 10);
  const quantity = Number.parseInt(req.body?.quantity, 10);
  const note = sanitizeText(req.body?.note, 500);
  const createdBy = sanitizeText(req.body?.changedBy, 120) || 'لوحة الإدارة';

  try {
    const account = await adminAdjustAccount({ accountId, quantity, note, createdBy });
    broadcastAdminEvent('coupons-updated', { accountId, quantity });
    return res.json({ success: true, account });
  } catch (error) {
    const status = error.statusCode || 500;
    if (status < 500) {
      return res.status(status).json({ success: false, error: error.message });
    }
    throw error;
  }
}

async function createAdminCouponAccount(req, res) {
  const phone = normalizePhone(req.body?.phone);
  const serviceType = sanitizeText(req.body?.serviceType, 40);
  const customerName = sanitizeText(req.body?.customerName || req.body?.name, 160);
  const quantity = Number.parseInt(req.body?.quantity ?? 0, 10) || 0;

  if (!isValidJordanPhone(phone)) {
    return res.status(400).json({ success: false, error: 'رقم الهاتف غير صالح' });
  }
  // Digital books are external-only.
  if (serviceType && serviceType !== 'external') {
    return res.status(400).json({ success: false, error: 'الدفتر الرقمي متاح للخدمة الخارجية فقط' });
  }

  const account = await getOrCreateAccount(phone, 'external', customerName);
  if (quantity > 0) {
    await adminAdjustAccount({
      accountId: account.id,
      quantity,
      note: sanitizeText(req.body?.note, 500) || 'إصدار يدوي من لوحة الإدارة',
      createdBy: sanitizeText(req.body?.changedBy, 120) || 'لوحة الإدارة'
    });
  }

  const balances = await getBalancesForPhone(phone);
  broadcastAdminEvent('coupons-updated', { phone, created: true });
  return res.status(201).json({
    success: true,
    accounts: balances
  });
}

async function blockAdminCouponAccount(req, res) {
  const accountId = Number.parseInt(req.params.id, 10);
  const status = sanitizeText(req.body?.status, 20) || 'blocked';
  if (!['active', 'blocked'].includes(status)) {
    return res.status(400).json({ success: false, error: 'حالة غير صالحة' });
  }
  await run(`UPDATE coupon_accounts SET status = ?, updated_at = NOW() WHERE id = ?`, [status, accountId]);
  broadcastAdminEvent('coupons-updated', { accountId, status });
  return res.json({ success: true, accountId, status });
}

module.exports = {
  getPublicBalance,
  listAdminCouponAccounts,
  getAdminCouponLedger,
  adjustAdminCouponAccount,
  createAdminCouponAccount,
  blockAdminCouponAccount
};
