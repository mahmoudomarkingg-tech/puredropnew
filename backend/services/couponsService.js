'use strict';

const crypto = require('node:crypto');
const { all, get, run } = require('../db/query');
const { sanitizeText, normalizePhone, money } = require('../utils/helpers');

/** Digital external coupon books only (product id → meta) */
const DIGITAL_COUPON_PACKS = {
  11: { count: 25, serviceType: 'external', label: 'دفتر رقمي خارجي 25' },
  12: { count: 20, serviceType: 'external', label: 'دفتر رقمي خارجي 20' },
  13: { count: 25, serviceType: 'external', label: 'دفتر رقمي خارجي 25+' },
  14: { count: 30, serviceType: 'external', label: 'دفتر رقمي خارجي 30' }
};

/** Bottle refill product: 1 JOD or 1 external coupon (incl. delivery) */
const REFILL_PRODUCT_ID = 21;

function getPackMeta(productId) {
  return DIGITAL_COUPON_PACKS[Number(productId)] || null;
}

function serviceLabel(serviceType) {
  return serviceType === 'external' ? 'خارجي' : 'داخلي';
}

function normalizeBookNumber(value) {
  return sanitizeText(String(value || '').toUpperCase().replace(/\s+/g, ''), 40);
}

async function generateBookNumber(client) {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const code = `EXT-${crypto.randomInt(100000, 1000000)}`;
    const exists = await get(
      'SELECT id FROM coupon_accounts WHERE book_number = ?',
      [code],
      client
    );
    if (!exists) return code;
  }
  return `EXT-${Date.now().toString().slice(-8)}`;
}

async function ensureBookNumber(account, client) {
  if (account.bookNumber) return account.bookNumber;
  const bookNumber = await generateBookNumber(client);
  await run(
    `UPDATE coupon_accounts SET book_number = ?, updated_at = NOW() WHERE id = ? AND book_number IS NULL`,
    [bookNumber, account.id],
    client
  );
  const refreshed = await get(
    'SELECT book_number AS "bookNumber" FROM coupon_accounts WHERE id = ?',
    [account.id],
    client
  );
  account.bookNumber = refreshed?.bookNumber || bookNumber;
  return account.bookNumber;
}

async function getOrCreateAccount(phone, serviceType, customerName, client) {
  const normalized = normalizePhone(phone);
  const type = serviceType === 'external' ? 'external' : 'external';
  const existing = await get(
    `SELECT id, phone, customer_name AS "customerName", service_type AS "serviceType",
            book_number AS "bookNumber", remaining, total_issued AS "totalIssued",
            total_redeemed AS "totalRedeemed",
            COALESCE(applied_redeem_count, 0)::int AS "appliedRedeemCount", status
     FROM coupon_accounts
     WHERE phone = ? AND service_type = ?`,
    [normalized, type],
    client
  );
  if (existing) {
    if (customerName && customerName !== existing.customerName) {
      await run(
        `UPDATE coupon_accounts SET customer_name = ?, updated_at = NOW() WHERE id = ?`,
        [customerName, existing.id],
        client
      );
      existing.customerName = customerName;
    }
    if (!existing.bookNumber) {
      await ensureBookNumber(existing, client);
    }
    return existing;
  }

  const bookNumber = await generateBookNumber(client);
  const inserted = await run(
    `INSERT INTO coupon_accounts
       (phone, customer_name, service_type, book_number, remaining, total_issued, total_redeemed, applied_redeem_count, status)
     VALUES (?, ?, ?, ?, 0, 0, 0, 0, 'active')
     RETURNING id, phone, customer_name AS "customerName", service_type AS "serviceType",
               book_number AS "bookNumber", remaining, total_issued AS "totalIssued",
               total_redeemed AS "totalRedeemed",
               COALESCE(applied_redeem_count, 0)::int AS "appliedRedeemCount", status`,
    [normalized, customerName || null, type, bookNumber],
    client
  );
  return inserted.rows[0];
}

async function getAccountByBookNumber(bookNumber, client) {
  const code = normalizeBookNumber(bookNumber);
  if (!code) return null;
  return get(
    `SELECT id, phone, customer_name AS "customerName", service_type AS "serviceType",
            book_number AS "bookNumber", remaining, total_issued AS "totalIssued",
            total_redeemed AS "totalRedeemed",
            COALESCE(applied_redeem_count, 0)::int AS "appliedRedeemCount", status
     FROM coupon_accounts
     WHERE UPPER(REPLACE(book_number, ' ', '')) = ?`,
    [code],
    client
  );
}

async function getPendingReserved(accountId, client, excludeOrderId = null) {
  const params = [accountId];
  let excludeSql = '';
  if (excludeOrderId) {
    excludeSql = 'AND o.id <> ?';
    params.push(excludeOrderId);
  }
  const row = await get(
    `SELECT COALESCE(SUM(o.coupons_redeemed), 0)::int AS reserved
     FROM orders o
     WHERE o.coupon_account_id = ?
       AND o.coupon_redeem_status = 'pending'
       AND o.status <> 'cancelled'
       ${excludeSql}`,
    params,
    client
  );
  return Number(row?.reserved) || 0;
}

async function addLedger(accountId, entryType, quantity, orderId, note, createdBy, client) {
  await run(
    `INSERT INTO coupon_ledger (account_id, entry_type, quantity, order_id, note, created_by)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [accountId, entryType, quantity, orderId || null, note || null, createdBy || 'system'],
    client
  );
}

async function issueCreditsFromOrderItems({ phone, customerName, orderId, preparedItems, client }) {
  const issued = [];
  for (const item of preparedItems) {
    const pack = getPackMeta(item.productId);
    if (!pack) continue;
    const qty = Number(item.quantity) * pack.count;
    if (qty <= 0) continue;

    const account = await getOrCreateAccount(phone, 'external', customerName, client);
    const bookNumber = await ensureBookNumber(account, client);

    await run(
      `UPDATE coupon_accounts
       SET remaining = remaining + ?,
           total_issued = total_issued + ?,
           updated_at = NOW()
       WHERE id = ?`,
      [qty, qty, account.id],
      client
    );
    await addLedger(
      account.id,
      'issue',
      qty,
      orderId,
      `شراء ${pack.label} × ${item.quantity} — رقم الدفتر ${bookNumber}`,
      'الموقع الإلكتروني',
      client
    );
    issued.push({
      productId: item.productId,
      serviceType: 'external',
      coupons: qty,
      label: pack.label,
      bookNumber,
      remainingAfter: Number(account.remaining || 0) + qty
    });
  }
  return issued;
}

async function getBalancesForPhone(phone) {
  const normalized = normalizePhone(phone);
  const rows = await all(
    `SELECT id, phone, customer_name AS "customerName", service_type AS "serviceType",
            book_number AS "bookNumber", remaining, total_issued AS "totalIssued",
            total_redeemed AS "totalRedeemed",
            COALESCE(applied_redeem_count, 0)::int AS "appliedRedeemCount", status,
            created_at AS "createdAt", updated_at AS "updatedAt"
     FROM coupon_accounts
     WHERE phone = ?
     ORDER BY service_type ASC`,
    [normalized]
  );

  const enriched = [];
  for (const row of rows) {
    const pendingReserved = await getPendingReserved(row.id);
    enriched.push({
      ...row,
      serviceLabel: serviceLabel(row.serviceType),
      pendingReserved,
      available: Math.max(0, (Number(row.remaining) || 0) - pendingReserved)
    });
  }
  return enriched;
}

async function countRefillUnits(preparedItems) {
  return preparedItems
    .filter(item => Number(item.productId) === REFILL_PRODUCT_ID)
    .reduce((sum, item) => sum + Number(item.quantity || 0), 0);
}

/**
 * Plan (pending) coupon redeem for refill orders.
 * Does NOT decrement balance until admin marks the order delivered.
 */
async function planCouponRedeemForOrder({
  phone,
  customerName,
  bookNumber,
  redeemQty,
  preparedItems,
  orderId,
  client
}) {
  const qty = Number.parseInt(redeemQty, 10) || 0;
  if (qty <= 0) {
    return {
      redeemQty: 0,
      discount: 0,
      serviceType: null,
      bookNumber: null,
      accountId: null,
      redeemStatus: null,
      availableAfterReserve: null
    };
  }

  const code = normalizeBookNumber(bookNumber);
  const refillUnits = await countRefillUnits(preparedItems);
  if (refillUnits <= 0) {
    const err = new Error('استخدام الكابونات الرقمية متاح مع طلب تعبئة القارورة فقط');
    err.statusCode = 400;
    throw err;
  }

  let account = code ? await getAccountByBookNumber(code, client) : null;
  // First order / same-cart book purchase: when book number omitted, use phone account
  // (credits for a digital pack in this order are issued before redeem).
  if (!account && !code && phone) {
    account = await getOrCreateAccount(phone, 'external', customerName, client);
    await ensureBookNumber(account, client);
  }
  if (!account) {
    const err = new Error(
      code
        ? 'رقم الدفتر غير موجود. تأكد من الرقم أو اشترِ دفتراً رقمياً مع الطلب'
        : 'أدخل رقم الدفتر الرقمي، أو اشترِ دفتراً رقمياً مع التعبئة ليُنشأ تلقائياً'
    );
    err.statusCode = code ? 404 : 400;
    throw err;
  }

  if (account.serviceType !== 'external') {
    const err = new Error('هذا النظام يعتمد الدفتر الرقمي الخارجي فقط');
    err.statusCode = 400;
    throw err;
  }

  if (account.status !== 'active') {
    const err = new Error('حساب الكابونات الرقمية غير نشط. تواصل مع الدعم');
    err.statusCode = 400;
    throw err;
  }

  const accountPhone = normalizePhone(account.phone);
  const orderPhone = normalizePhone(phone);
  if (accountPhone && orderPhone && accountPhone !== orderPhone) {
    const err = new Error('رقم الدفتر غير مرتبط برقم الهاتف المدخل في الطلب');
    err.statusCode = 400;
    throw err;
  }

  if (customerName && customerName !== account.customerName) {
    await run(
      `UPDATE coupon_accounts SET customer_name = ?, updated_at = NOW() WHERE id = ?`,
      [customerName, account.id],
      client
    );
  }

  if (qty > refillUnits) {
    const err = new Error(
      `لا يمكن استخدام ${qty} كابون بينما السلة فيها ${refillUnits} تعبئة فقط. عدد الكابونات يجب أن يساوي عدد التعبئة.`
    );
    err.statusCode = 400;
    throw err;
  }

  const pendingReserved = await getPendingReserved(account.id, client, orderId);
  const available = Math.max(0, (Number(account.remaining) || 0) - pendingReserved);

  if (qty !== refillUnits) {
    const err = new Error(
      `عدد الكابونات (${qty}) يجب أن يساوي عدد تعبئة القوارير في الطلب (${refillUnits})`
    );
    err.statusCode = 400;
    throw err;
  }

  // Strict: never allow ordering more refill units than available coupons.
  // (Previously maxRedeem silently capped and still created the order.)
  if (available <= 0) {
    const err = new Error(
      'لا يوجد رصيد كابونات متاح على هذا الدفتر (قد يكون محجوزاً لطلبات قيد التسليم)'
    );
    err.statusCode = 400;
    throw err;
  }
  if (qty > available) {
    const shortage = qty - available;
    const err = new Error(
      `رصيدك المتاح ${available} كابون فقط (ينقصك ${shortage}). قلّل التعبئة إلى ${available} أو أضف دفتراً رقمياً لنفس السلة ليُحسب الرصيد الجديد فوراً.`
    );
    err.statusCode = 400;
    throw err;
  }

  const maxRedeem = qty;

  // Each refill unit is 1 JOD — one coupon covers one refill.
  const refillItems = preparedItems.filter(item => Number(item.productId) === REFILL_PRODUCT_ID);
  const units = [];
  for (const item of refillItems) {
    for (let i = 0; i < item.quantity; i += 1) {
      units.push(Number(item.unitPrice));
    }
  }
  let discount = 0;
  for (let i = 0; i < maxRedeem; i += 1) {
    discount += units[i] || 1;
  }
  discount = money(discount);

  // First coupon order: reserve only until admin marks delivered.
  // From the 2nd coupon order onward: deduct immediately (even if prior order not delivered yet).
  const priorOrders = await get(
    `SELECT COUNT(*)::int AS total
     FROM orders
     WHERE coupon_account_id = ?
       AND COALESCE(coupons_redeemed, 0) > 0
       AND status <> 'cancelled'
       AND id <> ?`,
    [account.id, orderId || 0],
    client
  );
  const isSecondOrLater = (Number(priorOrders?.total) || 0) > 0;

  if (isSecondOrLater) {
    const updated = await run(
      `UPDATE coupon_accounts
       SET remaining = remaining - ?,
           total_redeemed = total_redeemed + ?,
           applied_redeem_count = COALESCE(applied_redeem_count, 0) + 1,
           updated_at = NOW()
       WHERE id = ? AND remaining >= ? AND status = 'active'
       RETURNING remaining`,
      [maxRedeem, maxRedeem, account.id, maxRedeem],
      client
    );
    if (!updated.rowCount) {
      const err = new Error('تعذر خصم الكابونات (رصيد غير كافٍ)');
      err.statusCode = 409;
      throw err;
    }
    await addLedger(
      account.id,
      'redeem',
      -maxRedeem,
      orderId,
      `خصم تلقائي فوري ${maxRedeem} كابون (طلب متكرر) — دفتر ${account.bookNumber}`,
      'الموقع الإلكتروني',
      client
    );
    return {
      redeemQty: maxRedeem,
      discount,
      serviceType: 'external',
      bookNumber: account.bookNumber,
      accountId: account.id,
      redeemStatus: 'applied',
      immediate: true,
      availableAfterReserve: Number(updated.rows[0].remaining),
      remainingDisplay: Number(updated.rows[0].remaining)
    };
  }

  return {
    redeemQty: maxRedeem,
    discount,
    serviceType: 'external',
    bookNumber: account.bookNumber,
    accountId: account.id,
    redeemStatus: 'pending',
    immediate: false,
    availableAfterReserve: available - maxRedeem,
    remainingDisplay: Number(account.remaining) || 0
  };
}

async function applyPendingCouponRedeem(orderId, client) {
  const order = await get(
    `SELECT id, coupons_redeemed AS "couponsRedeemed", coupon_redeem_status AS "couponRedeemStatus",
            coupon_account_id AS "couponAccountId", coupon_book_number AS "couponBookNumber",
            status
     FROM orders WHERE id = ?`,
    [orderId],
    client
  );
  if (!order) return null;
  if (order.couponRedeemStatus === 'applied') return { alreadyApplied: true };
  if (order.couponRedeemStatus !== 'pending' || !order.couponsRedeemed || !order.couponAccountId) {
    return { skipped: true };
  }

  const qty = Number(order.couponsRedeemed) || 0;
  const updated = await run(
    `UPDATE coupon_accounts
     SET remaining = remaining - ?,
         total_redeemed = total_redeemed + ?,
         applied_redeem_count = COALESCE(applied_redeem_count, 0) + 1,
         updated_at = NOW()
     WHERE id = ? AND remaining >= ? AND status = 'active'
     RETURNING remaining`,
    [qty, qty, order.couponAccountId, qty],
    client
  );

  if (!updated.rowCount) {
    const err = new Error('تعذر اعتماد خصم الكابونات عند التسليم (رصيد غير كافٍ)');
    err.statusCode = 409;
    throw err;
  }

  await addLedger(
    order.couponAccountId,
    'redeem',
    -qty,
    orderId,
    `اعتماد خصم ${qty} كابون بعد التسليم — دفتر ${order.couponBookNumber || ''}`,
    'لوحة الإدارة',
    client
  );

  await run(
    `UPDATE orders SET coupon_redeem_status = 'applied' WHERE id = ?`,
    [orderId],
    client
  );

  return {
    applied: true,
    redeemQty: qty,
    remainingAfter: Number(updated.rows[0].remaining)
  };
}

async function reverseAppliedCouponRedeem(orderId, client) {
  const entries = await all(
    `SELECT id, account_id AS "accountId", quantity
     FROM coupon_ledger
     WHERE order_id = ? AND entry_type = 'redeem' AND quantity < 0`,
    [orderId],
    client
  );

  for (const entry of entries) {
    const restore = Math.abs(entry.quantity);
    await run(
      `UPDATE coupon_accounts
       SET remaining = remaining + ?,
           total_redeemed = GREATEST(0, total_redeemed - ?),
           applied_redeem_count = GREATEST(0, COALESCE(applied_redeem_count, 0) - 1),
           updated_at = NOW()
       WHERE id = ?`,
      [restore, restore, entry.accountId],
      client
    );
    await addLedger(
      entry.accountId,
      'adjust',
      restore,
      orderId,
      'استرجاع كابونات بسبب إلغاء التسليم/الطلب',
      'النظام',
      client
    );
  }

  if (entries.length) {
    await run(
      `UPDATE orders SET coupon_redeem_status = 'pending' WHERE id = ? AND coupon_redeem_status = 'applied'`,
      [orderId],
      client
    );
  }
}

async function clearPendingCouponRedeem(orderId, client) {
  await run(
    `UPDATE orders
     SET coupon_redeem_status = CASE
           WHEN coupon_redeem_status = 'pending' THEN 'cancelled'
           ELSE coupon_redeem_status
         END
     WHERE id = ?`,
    [orderId],
    client
  );
}

async function reverseOrderCouponEffects(orderId, client) {
  const order = await get(
    `SELECT coupon_redeem_status AS "couponRedeemStatus" FROM orders WHERE id = ?`,
    [orderId],
    client
  );

  if (order?.couponRedeemStatus === 'applied') {
    await reverseAppliedCouponRedeem(orderId, client);
  }
  await clearPendingCouponRedeem(orderId, client);

  const entries = await all(
    `SELECT id, account_id AS "accountId", entry_type AS "entryType", quantity
     FROM coupon_ledger
     WHERE order_id = ? AND entry_type = 'issue'`,
    [orderId],
    client
  );

  for (const entry of entries) {
    if (entry.entryType === 'issue' && entry.quantity > 0) {
      await run(
        `UPDATE coupon_accounts
         SET remaining = GREATEST(0, remaining - ?),
             total_issued = GREATEST(0, total_issued - ?),
             updated_at = NOW()
         WHERE id = ?`,
        [entry.quantity, entry.quantity, entry.accountId],
        client
      );
      await addLedger(
        entry.accountId,
        'cancel',
        -entry.quantity,
        orderId,
        'إلغاء إصدار بسبب إلغاء الطلب',
        'النظام',
        client
      );
    }
  }
}

async function listAccounts({ q = '', limit = 100 } = {}) {
  const params = [];
  let where = '';
  const queryText = sanitizeText(q, 80);
  if (queryText) {
    where =
      'WHERE phone ILIKE ? OR COALESCE(customer_name, \'\') ILIKE ? OR COALESCE(book_number, \'\') ILIKE ?';
    params.push(`%${queryText}%`, `%${queryText}%`, `%${queryText}%`);
  }
  params.push(Math.min(Math.max(limit, 1), 300));

  const rows = await all(
    `SELECT id, phone, customer_name AS "customerName", service_type AS "serviceType",
            book_number AS "bookNumber", remaining, total_issued AS "totalIssued",
            total_redeemed AS "totalRedeemed", status,
            created_at AS "createdAt", updated_at AS "updatedAt"
     FROM coupon_accounts
     ${where}
     ORDER BY updated_at DESC
     LIMIT ?`,
    params
  );

  const result = [];
  for (const row of rows) {
    const pendingReserved = await getPendingReserved(row.id);
    result.push({
      ...row,
      serviceLabel: serviceLabel(row.serviceType),
      pendingReserved,
      available: Math.max(0, (Number(row.remaining) || 0) - pendingReserved)
    });
  }
  return result;
}

async function getAccountLedger(accountId, limit = 50) {
  return all(
    `SELECT id, entry_type AS "entryType", quantity, order_id AS "orderId",
            note, created_by AS "createdBy", created_at AS "createdAt"
     FROM coupon_ledger
     WHERE account_id = ?
     ORDER BY created_at DESC
     LIMIT ?`,
    [accountId, Math.min(Math.max(limit, 1), 200)]
  );
}

async function adminAdjustAccount({ accountId, quantity, note, createdBy }) {
  const delta = Number.parseInt(quantity, 10);
  if (!Number.isInteger(delta) || delta === 0) {
    const err = new Error('كمية التعديل غير صالحة');
    err.statusCode = 400;
    throw err;
  }

  const account = await get(
    `SELECT id, remaining, book_number AS "bookNumber" FROM coupon_accounts WHERE id = ?`,
    [accountId]
  );
  if (!account) {
    const err = new Error('حساب الكابونات غير موجود');
    err.statusCode = 404;
    throw err;
  }

  const next = Number(account.remaining) + delta;
  if (next < 0) {
    const err = new Error('لا يمكن أن يصبح الرصيد سالباً');
    err.statusCode = 400;
    throw err;
  }

  await run(
    `UPDATE coupon_accounts
     SET remaining = ?,
         total_issued = total_issued + ?,
         updated_at = NOW()
     WHERE id = ?`,
    [next, delta > 0 ? delta : 0, accountId]
  );

  await addLedger(
    accountId,
    'adjust',
    delta,
    null,
    note || 'تعديل يدوي من لوحة الإدارة',
    createdBy || 'لوحة الإدارة'
  );

  return get(
    `SELECT id, phone, customer_name AS "customerName", service_type AS "serviceType",
            book_number AS "bookNumber", remaining, total_issued AS "totalIssued",
            total_redeemed AS "totalRedeemed", status
     FROM coupon_accounts WHERE id = ?`,
    [accountId]
  );
}

module.exports = {
  DIGITAL_COUPON_PACKS,
  REFILL_PRODUCT_ID,
  getPackMeta,
  serviceLabel,
  normalizeBookNumber,
  getOrCreateAccount,
  getAccountByBookNumber,
  issueCreditsFromOrderItems,
  getBalancesForPhone,
  planCouponRedeemForOrder,
  applyPendingCouponRedeem,
  reverseAppliedCouponRedeem,
  clearPendingCouponRedeem,
  reverseOrderCouponEffects,
  listAccounts,
  getAccountLedger,
  adminAdjustAccount
};
