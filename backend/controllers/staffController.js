'use strict';

const jwt = require('jsonwebtoken');
const { all, get, run, withTransaction } = require('../db/query');
const { getJwtSecret } = require('../middleware/auth');
const { sanitizeText, translateOrderStatus, normalizeDeliveryStatus } = require('../utils/helpers');
const { broadcastAdminEvent } = require('../utils/sse');

function getStaffCredentials() {
  const username = String(process.env.STAFF_USERNAME || '').trim();
  const password = String(process.env.STAFF_PASSWORD || '');
  return { username, password };
}

async function login(req, res) {
  const { username: expectedUser, password: expectedPass } = getStaffCredentials();
  if (!expectedUser || !expectedPass) {
    return res.status(503).json({
      success: false,
      error: 'حساب الموظفين غير مفعّل. أضف STAFF_USERNAME و STAFF_PASSWORD في Environment'
    });
  }

  const username = sanitizeText(req.body?.username || req.body?.email, 120);
  const password = String(req.body?.password || '');

  if (!username || !password || username !== expectedUser || password !== expectedPass) {
    return res.status(401).json({ success: false, error: 'بيانات الدخول غير صحيحة' });
  }

  const expiresIn = process.env.STAFF_JWT_EXPIRES_IN || process.env.JWT_EXPIRES_IN || '12h';
  const token = jwt.sign(
    { username, role: 'staff' },
    getJwtSecret(),
    { subject: `staff:${username}`, expiresIn }
  );

  return res.json({
    success: true,
    token,
    expiresIn,
    staff: { username, role: 'staff' }
  });
}

async function me(req, res) {
  return res.json({ success: true, staff: req.staff });
}

function mapsUrlFor(row) {
  if (row.locationMapsUrl) return row.locationMapsUrl;
  const lat = Number(row.locationLat);
  const lng = Number(row.locationLng);
  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  }
  const address = String(row.customerAddress || '').trim();
  if (address) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  }
  return null;
}

/** Limited order list for delivery staff — today's undelivered orders only. */
async function listOrders(req, res) {
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit || '80', 10) || 80, 1), 200);
  const onlyActive = String(req.query.active || '1') !== '0';
  const todayOnly = String(req.query.today || '1') !== '0';

  const where = ["o.status <> 'cancelled'"];
  if (onlyActive) {
    where.push("o.status <> 'delivered'");
  }
  if (todayOnly) {
    where.push("o.created_at >= date_trunc('day', NOW())");
    where.push("o.created_at < date_trunc('day', NOW()) + interval '1 day'");
  }

  const rows = await all(
    `SELECT o.id,
            o.order_number AS "orderNumber",
            o.status,
            COALESCE(os.label_ar, o.status) AS "statusLabel",
            COALESCE(o.delivery_status, 'لم يتم التسليم') AS "deliveryStatus",
            o.delivery_time_preference AS "deliveryTimePreference",
            o.total,
            o.currency,
            o.payment_method AS "paymentMethod",
            o.created_at AS "createdAt",
            o.location_lat AS "locationLat",
            o.location_lng AS "locationLng",
            o.location_maps_url AS "locationMapsUrl",
            COALESCE(o.customer_name_snapshot, c.full_name) AS "customerName",
            COALESCE(o.customer_phone_snapshot, c.phone) AS "customerPhone",
            COALESCE(o.customer_address_snapshot, c.address) AS "customerAddress",
            COALESCE((SELECT SUM(quantity) FROM order_items oi WHERE oi.order_id = o.id), 0)::int AS "itemsCount",
            (
              SELECT STRING_AGG(oi2.product_name_snapshot || ' ×' || oi2.quantity, '، ')
              FROM order_items oi2
              WHERE oi2.order_id = o.id
            ) AS "itemsSummary"
     FROM orders o
     LEFT JOIN customers c ON c.id = o.customer_id
     LEFT JOIN order_statuses os ON os.status = o.status
     WHERE ${where.join(' AND ')}
     ORDER BY o.created_at DESC
     LIMIT ?`,
    [limit]
  );

  const orders = (rows || []).map((row) => ({
    id: row.id,
    orderNumber: row.orderNumber,
    status: row.status,
    statusLabel: row.statusLabel,
    deliveryStatus: row.deliveryStatus,
    deliveryTimePreference: row.deliveryTimePreference,
    total: row.total,
    currency: row.currency || 'JOD',
    paymentMethod: row.paymentMethod,
    createdAt: row.createdAt,
    customerName: row.customerName,
    customerPhone: row.customerPhone,
    customerAddress: row.customerAddress,
    itemsCount: row.itemsCount,
    itemsSummary: row.itemsSummary || '',
    mapsUrl: mapsUrlFor(row)
  }));

  return res.json({ success: true, orders, count: orders.length });
}

async function syncDeliveryTracking(client, orderId, orderNumber, deliveryStatus, deliveryNotes = null) {
  await run(
    `INSERT INTO "متابعة_تسليم_الطلبات"
     ("معرف الطلب", "رقم الطلب", "هل تم التسليم", "تاريخ التسليم", "ملاحظات التسليم")
     VALUES (?, ?, ?, CASE WHEN ? = 'تم التسليم' THEN NOW() ELSE NULL END, ?)
     ON CONFLICT ("معرف الطلب") DO NOTHING`,
    [orderId, orderNumber, deliveryStatus, deliveryStatus, deliveryNotes],
    client
  );

  await run(
    `UPDATE "متابعة_تسليم_الطلبات"
     SET
       "هل تم التسليم" = ?,
       "تاريخ التسليم" = CASE
         WHEN ? = 'تم التسليم' THEN COALESCE((SELECT delivered_at FROM orders WHERE id = ?), NOW())
         ELSE NULL
       END,
       "ملاحظات التسليم" = COALESCE(?, "ملاحظات التسليم"),
       "آخر تحديث" = NOW()
     WHERE "معرف الطلب" = ?`,
    [deliveryStatus, deliveryStatus, orderId, deliveryNotes, orderId],
    client
  );
}

/** Staff can only mark delivered — never cancel/delete. */
async function markDelivered(req, res) {
  const orderId = Number(req.params.id);
  if (!Number.isInteger(orderId) || orderId <= 0) {
    return res.status(400).json({ success: false, error: 'معرّف الطلب غير صالح' });
  }

  const deliveryStatus = normalizeDeliveryStatus('تم التسليم');
  const changedBy = sanitizeText(req.staff?.username, 80) || 'موظف توصيل';

  const order = await get(
    `SELECT o.id, o.order_number, o.status, o.delivery_status,
            COALESCE(o.customer_phone_snapshot, c.phone) AS "customerPhone"
     FROM orders o
     LEFT JOIN customers c ON c.id = o.customer_id
     WHERE o.id = ?`,
    [orderId]
  );
  if (!order) {
    return res.status(404).json({ success: false, error: 'الطلب غير موجود' });
  }
  if (order.status === 'cancelled') {
    return res.status(400).json({ success: false, error: 'لا يمكن تسليم طلب ملغى' });
  }
  if (order.status === 'delivered') {
    return res.json({
      success: true,
      unchanged: true,
      orderId,
      orderNumber: order.order_number,
      message: 'الطلب مُسلَّم مسبقاً'
    });
  }

  const { applyPendingCouponRedeem } = require('../services/couponsService');
  let couponApplyResult = null;

  try {
    await withTransaction(async (client) => {
      await run(
        `UPDATE orders
         SET status = 'delivered',
             delivery_status = ?,
             delivery_status_updated_at = NOW(),
             delivered_at = COALESCE(delivered_at, NOW()),
             cancelled_at = NULL
         WHERE id = ?`,
        [deliveryStatus, orderId],
        client
      );
      await syncDeliveryTracking(client, orderId, order.order_number, deliveryStatus, null);
      couponApplyResult = await applyPendingCouponRedeem(orderId, client);
      await run(
        `INSERT INTO order_status_history (order_id, old_status, new_status, note, changed_by)
         VALUES (?, ?, 'delivered', ?, ?)`,
        [orderId, order.status, 'تم التسليم بواسطة موظف التوصيل', changedBy],
        client
      );
    });
  } catch (error) {
    const status = error.statusCode || 500;
    if (status < 500) {
      return res.status(status).json({ success: false, error: error.message });
    }
    throw error;
  }

  broadcastAdminEvent('orders-updated', {
    orderId,
    orderNumber: order.order_number,
    status: 'delivered',
    deliveryStatus
  });
  if (couponApplyResult?.applied) {
    broadcastAdminEvent('coupons-updated', { orderId, status: 'delivered' });
  }

  let smsResult = null;
  try {
    const { notifyCustomerDelivered } = require('../services/smsService');
    smsResult = await notifyCustomerDelivered({
      orderNumber: order.order_number,
      customerPhone: order.customerPhone
    });
  } catch (error) {
    console.error('[sms] staff deliver:', error.message);
    smsResult = { ok: false, reason: error.message };
  }

  return res.json({
    success: true,
    orderId,
    orderNumber: order.order_number,
    status: 'delivered',
    statusLabel: translateOrderStatus('delivered'),
    deliveryStatus,
    couponApplyResult,
    smsResult
  });
}

module.exports = {
  login,
  me,
  listOrders,
  markDelivered
};
