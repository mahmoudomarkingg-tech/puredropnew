'use strict';

const { all, get, run, withTransaction } = require('../db/query');
const { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } = require('../utils/constants');
const { addAdminEventClient, broadcastAdminEvent } = require('../utils/sse');
const {
  sanitizeText,
  translateOrderStatus,
  translatePaymentStatus,
  translatePaymentMethod,
  translateDeliveryTime,
  normalizeDeliveryStatus
} = require('../utils/helpers');

async function getAdminOrderItems(orderId) {
  return all(
    `SELECT oi.id,
            oi.product_id AS "productId",
            oi.product_option_id AS "productOptionId",
            oi.product_name_snapshot AS "productName",
            oi.option_label_snapshot AS "optionLabel",
            oi.quantity,
            oi.unit_price AS "unitPrice",
            oi.line_total AS "lineTotal",
            oi.created_at AS "createdAt",
            p.category_id AS "categoryId"
     FROM order_items oi
     LEFT JOIN products p ON p.id = oi.product_id
     WHERE oi.order_id = ?
     ORDER BY oi.id ASC`,
    [orderId]
  );
}

function adminOrderRetentionDays() {
  const n = Number.parseInt(process.env.ADMIN_ORDER_RETENTION_DAYS || '30', 10);
  return Number.isFinite(n) && n > 0 ? Math.min(Math.max(n, 7), 365) : 30;
}

/** Hard-delete orders older than retention window (default 30 days). */
async function purgeExpiredOrders() {
  const days = adminOrderRetentionDays();
  const now = Date.now();
  if (global.__puredropLastOrderPurge && now - global.__puredropLastOrderPurge < 60 * 60 * 1000) {
    return { deleted: 0, days, skipped: true };
  }
  global.__puredropLastOrderPurge = now;
  const result = await run(
    `DELETE FROM orders
     WHERE created_at < NOW() - make_interval(days => ?::int)`,
    [days]
  );
  const deleted = Number(result?.rowCount || 0);
  if (deleted > 0) {
    console.info(`[orders] purged ${deleted} orders older than ${days} days`);
    broadcastAdminEvent('orders-updated', { purged: deleted, retentionDays: days });
  }
  return { deleted, days, skipped: false };
}

async function getAdminOrderStatusCounts() {
  const retentionDays = adminOrderRetentionDays();
  const rows = await all(
    `SELECT os.status, os.label_ar AS "labelAr", os.color, os.sort_order AS "sortOrder",
            COALESCE(COUNT(o.id), 0)::int AS total
     FROM order_statuses os
     LEFT JOIN orders o ON o.status = os.status
       AND o.created_at >= NOW() - make_interval(days => ?::int)
     GROUP BY os.status, os.label_ar, os.color, os.sort_order
     ORDER BY os.sort_order ASC`,
    [retentionDays]
  );

  // Cancelled orders stay in history/filters, but are excluded from business KPIs.
  const allOrders = Number(
    (await get(
      `SELECT COUNT(*)::int AS total FROM orders
       WHERE status <> 'cancelled'
         AND created_at >= NOW() - make_interval(days => ?::int)`,
      [retentionDays]
    ))?.total || 0
  );
  const todayOrders = Number(
    (await get(
      `SELECT COUNT(*)::int AS total
       FROM orders
       WHERE created_at::date = CURRENT_DATE
         AND status <> 'cancelled'`
    ))?.total || 0
  );
  const totalSales = Number(
    (await get(
      `SELECT COALESCE(SUM(total), 0) AS total
       FROM orders
       WHERE status <> 'cancelled'
         AND created_at >= NOW() - make_interval(days => ?::int)`,
      [retentionDays]
    ))?.total || 0
  );
  const deliveredOrders = Number(
    (await get(
      `SELECT COUNT(*)::int AS total
       FROM orders
       WHERE delivery_status = 'تم التسليم'
         AND status <> 'cancelled'
         AND created_at >= NOW() - make_interval(days => ?::int)`,
      [retentionDays]
    ))?.total || 0
  );
  const notDeliveredOrders = Number(
    (await get(
      `SELECT COUNT(*)::int AS total
       FROM orders
       WHERE delivery_status = 'لم يتم التسليم'
         AND status <> 'cancelled'
         AND created_at >= NOW() - make_interval(days => ?::int)`,
      [retentionDays]
    ))?.total || 0
  );
  const cancelledOrders = Number(
    (await get(
      `SELECT COUNT(*)::int AS total FROM orders
       WHERE status = 'cancelled'
         AND created_at >= NOW() - make_interval(days => ?::int)`,
      [retentionDays]
    ))?.total || 0
  );

  return {
    all: allOrders,
    today: todayOrders,
    totalSales,
    delivered: deliveredOrders,
    notDelivered: notDeliveredOrders,
    cancelled: cancelledOrders,
    retentionDays,
    byStatus: rows
  };
}

async function listOrders(req, res) {
  const purgeInfo = await purgeExpiredOrders();
  const params = [];
  const where = [];
  const status = sanitizeText(req.query.status, 80);
  const queryText = sanitizeText(req.query.q, 160);
  const retentionDays = adminOrderRetentionDays();
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit || '500', 10) || 500, 1), 1000);

  // Keep admin list within retention window (matches auto-delete policy).
  where.push('o.created_at >= NOW() - make_interval(days => ?::int)');
  params.push(retentionDays);

  if (status && status !== 'all') {
    where.push('o.status = ?');
    params.push(status);
  } else {
    // Default "all" view = active orders only; open the ملغي filter to see cancelled.
    where.push("o.status <> 'cancelled'");
  }

  if (queryText) {
    where.push(
      `(o.order_number ILIKE ?
        OR COALESCE(o.customer_name_snapshot, c.full_name) ILIKE ?
        OR COALESCE(o.customer_phone_snapshot, c.phone) ILIKE ?
        OR COALESCE(o.customer_address_snapshot, c.address) ILIKE ?
        OR COALESCE(o.coupon_book_number, '') ILIKE ?)`
    );
    const like = `%${queryText}%`;
    params.push(like, like, like, like, like);
  }

  params.push(limit);

  const rows = await all(
    `SELECT o.id,
            o.order_number AS "orderNumber",
            o.status,
            COALESCE(os.label_ar, o.status) AS "statusLabel",
            COALESCE(os.color, '#06b6d4') AS "statusColor",
            o.delivery_time_preference AS "deliveryTimePreference",
            o.subtotal,
            o.delivery_fee AS "deliveryFee",
            o.tax,
            COALESCE(o.coupon_discount, 0) AS "couponDiscount",
            COALESCE(o.coupons_redeemed, 0)::int AS "couponsRedeemed",
            o.coupon_service_type AS "couponServiceType",
            o.coupon_book_number AS "couponBookNumber",
            o.coupon_redeem_status AS "couponRedeemStatus",
            o.coupon_account_id AS "couponAccountId",
            COALESCE(
              (
                SELECT ca.remaining
                FROM coupon_accounts ca
                WHERE ca.id = o.coupon_account_id
              ),
              (
                SELECT ca2.remaining
                FROM coupon_accounts ca2
                WHERE ca2.phone = COALESCE(o.customer_phone_snapshot, c.phone)
                  AND ca2.service_type = 'external'
                ORDER BY ca2.updated_at DESC
                LIMIT 1
              )
            ) AS "couponRemaining",
            COALESCE(
              o.coupon_book_number,
              (
                SELECT ca3.book_number
                FROM coupon_accounts ca3
                WHERE ca3.phone = COALESCE(o.customer_phone_snapshot, c.phone)
                  AND ca3.service_type = 'external'
                ORDER BY ca3.updated_at DESC
                LIMIT 1
              )
            ) AS "customerBookNumber",
            o.total,
            o.currency,
            o.source,
            o.payment_method AS "paymentMethod",
            o.payment_status AS "paymentStatus",
            COALESCE(t."هل تم التسليم", o.delivery_status, 'لم يتم التسليم') AS "deliveryStatus",
            COALESCE(t."تاريخ التسليم", o.delivered_at) AS "deliveryDate",
            COALESCE(t."ملاحظات التسليم", o.delivery_notes) AS "deliveryNotes",
            t."آخر تحديث" AS "deliveryStatusUpdatedAt",
            o.notes,
            o.admin_notes AS "adminNotes",
            o.confirmed_at AS "confirmedAt",
            o.delivered_at AS "deliveredAt",
            o.cancelled_at AS "cancelledAt",
            o.created_at AS "createdAt",
            o.updated_at AS "updatedAt",
            o.location_lat AS "locationLat",
            o.location_lng AS "locationLng",
            o.location_maps_url AS "locationMapsUrl",
            c.id AS "customerId",
            COALESCE(o.customer_name_snapshot, c.full_name) AS "customerName",
            COALESCE(o.customer_phone_snapshot, c.phone) AS "customerPhone",
            COALESCE(o.customer_address_snapshot, c.address) AS "customerAddress",
            c.city AS "customerCity",
            c.notes AS "customerNotes",
            COALESCE((SELECT SUM(quantity) FROM order_items oi WHERE oi.order_id = o.id), 0)::int AS "itemsCount"
     FROM orders o
     JOIN customers c ON c.id = o.customer_id
     LEFT JOIN order_statuses os ON os.status = o.status
     LEFT JOIN "متابعة_تسليم_الطلبات" t ON t."معرف الطلب" = o.id
     ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
     ORDER BY o.created_at DESC, o.id DESC
     LIMIT ?`,
    params
  );

  const orders = [];
  for (const row of rows) {
    orders.push({
      ...row,
      subtotal: Number(row.subtotal),
      deliveryFee: Number(row.deliveryFee),
      tax: Number(row.tax),
      couponDiscount: Number(row.couponDiscount || 0),
      couponsRedeemed: Number(row.couponsRedeemed || 0),
      couponServiceType: row.couponServiceType || null,
      couponBookNumber: row.couponBookNumber || row.customerBookNumber || null,
      customerBookNumber: row.customerBookNumber || row.couponBookNumber || null,
      couponRedeemStatus: row.couponRedeemStatus || null,
      couponRemaining:
        row.couponRemaining == null ? null : Number(row.couponRemaining),
      total: Number(row.total),
      statusLabel: row.statusLabel || translateOrderStatus(row.status),
      statusColor: row.statusColor || ORDER_STATUS_COLORS[row.status] || '#06b6d4',
      deliveryTimeLabel: translateDeliveryTime(row.deliveryTimePreference),
      paymentMethodLabel: translatePaymentMethod(row.paymentMethod),
      paymentStatusLabel: translatePaymentStatus(row.paymentStatus),
      sourceLabel: row.source === 'website' ? 'الموقع الإلكتروني' : row.source,
      deliveryStatus: row.deliveryStatus || (row.status === 'delivered' ? 'تم التسليم' : 'لم يتم التسليم'),
      deliveryDate: row.deliveryDate || row.deliveredAt || null,
      deliveryNotes: row.deliveryNotes || '',
      items: await getAdminOrderItems(row.id)
    });
  }

  const statuses = (await all(
    `SELECT status, label_ar AS "labelAr", description_ar AS "descriptionAr", color,
            sort_order AS "sortOrder", is_final AS "isFinal"
     FROM order_statuses
     ORDER BY sort_order ASC`
  )).map(row => ({ ...row, isFinal: Boolean(row.isFinal) }));

  res.json({
    success: true,
    generatedAt: new Date().toISOString(),
    retentionDays,
    purged: purgeInfo?.deleted || 0,
    counts: await getAdminOrderStatusCounts(),
    statuses,
    orders
  });
}

async function listOrderStatuses(req, res) {
  const statuses = (await all(
    `SELECT status, label_ar AS "labelAr", description_ar AS "descriptionAr", color,
            sort_order AS "sortOrder", is_final AS "isFinal"
     FROM order_statuses
     ORDER BY sort_order ASC`
  )).map(row => ({ ...row, isFinal: Boolean(row.isFinal) }));

  res.json({ success: true, statuses });
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

async function updateOrderStatus(req, res) {
  const orderId = Number(req.params.id);
  const newStatus = sanitizeText(req.body?.status, 80);
  const note = sanitizeText(req.body?.note, 1000);
  const adminNotes = sanitizeText(req.body?.adminNotes, 1200);
  const changedBy = sanitizeText(req.body?.changedBy, 120) || 'لوحة الإدارة';

  if (!Number.isInteger(orderId) || orderId <= 0) {
    return res.status(400).json({ success: false, error: 'معرّف الطلب غير صالح' });
  }

  if (!ORDER_STATUS_LABELS[newStatus]) {
    return res.status(400).json({ success: false, error: 'حالة الطلب غير صالحة' });
  }

  const order = await get('SELECT id, order_number, status FROM orders WHERE id = ?', [orderId]);
  if (!order) {
    return res.status(404).json({ success: false, error: 'الطلب غير موجود' });
  }

  if (order.status === newStatus && !note && !adminNotes) {
    return res.json({
      success: true,
      unchanged: true,
      orderId,
      orderNumber: order.order_number,
      oldStatus: order.status,
      newStatus,
      statusLabel: translateOrderStatus(newStatus),
      deliveryStatus: newStatus === 'delivered' ? 'تم التسليم' : 'لم يتم التسليم',
      message: 'الحالة لم تتغير'
    });
  }

  const deliveryStatus = newStatus === 'delivered' ? 'تم التسليم' : 'لم يتم التسليم';

  const {
    reverseOrderCouponEffects,
    reactivateOrderCouponEffects,
    applyPendingCouponRedeem,
    reverseAppliedCouponRedeem
  } = require('../services/couponsService');

  let couponApplyResult = null;

  try {
    await withTransaction(async client => {
      const setParts = [
        'status = ?',
        'delivery_status = ?',
        'delivery_status_updated_at = NOW()'
      ];
      const params = [newStatus, deliveryStatus];

      if (adminNotes) {
        setParts.push('admin_notes = ?');
        params.push(adminNotes);
      }

      if (newStatus === 'confirmed') {
        setParts.push('confirmed_at = COALESCE(confirmed_at, NOW())');
      }
      if (newStatus === 'delivered') {
        setParts.push('delivered_at = COALESCE(delivered_at, NOW())');
      } else {
        setParts.push('delivered_at = NULL');
      }
      if (newStatus === 'cancelled') {
        setParts.push('cancelled_at = COALESCE(cancelled_at, NOW())');
      } else {
        setParts.push('cancelled_at = NULL');
      }

      params.push(orderId);
      await run(`UPDATE orders SET ${setParts.join(', ')} WHERE id = ?`, params, client);
      await syncDeliveryTracking(client, orderId, order.order_number, deliveryStatus, null);

      // Cancel → restore coupons / roll back pack. Un-cancel → put them back.
      if (newStatus === 'cancelled' && order.status !== 'cancelled') {
        await reverseOrderCouponEffects(orderId, client);
      } else if (order.status === 'cancelled' && newStatus !== 'cancelled') {
        await reactivateOrderCouponEffects(orderId, client);
      }

      if (newStatus === 'delivered' && order.status !== 'delivered') {
        couponApplyResult = await applyPendingCouponRedeem(orderId, client);
      } else if (order.status === 'delivered' && newStatus !== 'delivered' && newStatus !== 'cancelled') {
        await reverseAppliedCouponRedeem(orderId, client);
      }

      await run(
        `INSERT INTO order_status_history (order_id, old_status, new_status, note, changed_by)
         VALUES (?, ?, ?, ?, ?)`,
        [
          orderId,
          order.status,
          newStatus,
          note || `تم تغيير الحالة إلى ${translateOrderStatus(newStatus)}`,
          changedBy
        ],
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
    status: newStatus,
    deliveryStatus
  });

  if (
    couponApplyResult?.applied ||
    newStatus === 'cancelled' ||
    (order.status === 'cancelled' && newStatus !== 'cancelled')
  ) {
    broadcastAdminEvent('coupons-updated', { orderId, status: newStatus });
  }

  return res.json({
    success: true,
    orderId,
    orderNumber: order.order_number,
    oldStatus: order.status,
    newStatus,
    statusLabel: translateOrderStatus(newStatus),
    deliveryStatus,
    couponApplyResult
  });
}

async function updateOrderDeliveryStatus(req, res) {
  const orderId = Number(req.params.id);
  const payload = req.body || {};
  const deliveryStatus = normalizeDeliveryStatus(
    payload.deliveryStatus || payload.delivery_status || payload.status || payload.value
  );
  const deliveryNotes = sanitizeText(payload.deliveryNotes || payload.delivery_notes || payload.note, 1200);
  const changedBy = sanitizeText(payload.changedBy, 120) || 'لوحة الإدارة';

  if (!Number.isInteger(orderId) || orderId <= 0) {
    return res.status(400).json({ success: false, error: 'معرّف الطلب غير صالح' });
  }

  if (!deliveryStatus) {
    return res.status(400).json({
      success: false,
      error: 'قيمة حالة التسليم غير صالحة. استخدم: تم التسليم أو لم يتم التسليم'
    });
  }

  const order = await get(
    'SELECT id, order_number, status, delivery_status FROM orders WHERE id = ?',
    [orderId]
  );
  if (!order) {
    return res.status(404).json({ success: false, error: 'الطلب غير موجود' });
  }

  // Keep order status and delivery flag aligned.
  let nextStatus = order.status;
  if (deliveryStatus === 'تم التسليم') {
    nextStatus = 'delivered';
  } else if (order.status === 'delivered') {
    nextStatus = 'out_for_delivery';
  }

  const {
    applyPendingCouponRedeem,
    reverseAppliedCouponRedeem
  } = require('../services/couponsService');

  let couponApplyResult = null;

  try {
    await withTransaction(async client => {
      await run(
        `UPDATE orders
         SET delivery_status = ?,
             delivery_notes = ?,
             delivery_status_updated_at = NOW(),
             status = ?,
             delivered_at = CASE
               WHEN ? = 'تم التسليم' THEN COALESCE(delivered_at, NOW())
               ELSE NULL
             END,
             cancelled_at = CASE
               WHEN ? = 'cancelled' THEN COALESCE(cancelled_at, NOW())
               ELSE NULL
             END
         WHERE id = ?`,
        [deliveryStatus, deliveryNotes || null, nextStatus, deliveryStatus, nextStatus, orderId],
        client
      );

      await syncDeliveryTracking(
        client,
        orderId,
        order.order_number,
        deliveryStatus,
        deliveryNotes || null
      );

      if (deliveryStatus === 'تم التسليم' && order.status !== 'delivered') {
        couponApplyResult = await applyPendingCouponRedeem(orderId, client);
      } else if (deliveryStatus === 'لم يتم التسليم' && order.status === 'delivered') {
        await reverseAppliedCouponRedeem(orderId, client);
      }

      await run(
        `INSERT INTO order_status_history (order_id, old_status, new_status, note, changed_by)
         VALUES (?, ?, ?, ?, ?)`,
        [
          orderId,
          order.status,
          nextStatus,
          `تم تحديث التسليم إلى: ${deliveryStatus}${
            nextStatus !== order.status ? ` — الحالة: ${translateOrderStatus(nextStatus)}` : ''
          }`,
          changedBy
        ],
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
    deliveryStatus,
    status: nextStatus
  });

  if (couponApplyResult?.applied || couponApplyResult?.alreadyApplied === false) {
    broadcastAdminEvent('coupons-updated', { orderId, deliveryStatus });
  }

  return res.json({
    success: true,
    orderId,
    orderNumber: order.order_number,
    deliveryStatus,
    deliveryNotes: deliveryNotes || null,
    status: nextStatus,
    statusLabel: translateOrderStatus(nextStatus),
    couponApplyResult
  });
}

async function deleteOrder(req, res) {
  const orderId = Number(req.params.id);
  const changedBy = sanitizeText(req.body?.changedBy, 120) || 'لوحة الإدارة';

  if (!Number.isInteger(orderId) || orderId <= 0) {
    return res.status(400).json({ success: false, error: 'معرّف الطلب غير صالح' });
  }

  const order = await get(
    'SELECT id, order_number, status FROM orders WHERE id = ?',
    [orderId]
  );
  if (!order) {
    return res.status(404).json({ success: false, error: 'الطلب غير موجود' });
  }

  await withTransaction(async client => {
    // Related rows (items, history, delivery tracking) cascade via schema FKs.
    const result = await run('DELETE FROM orders WHERE id = ?', [orderId], client);
    if (!result.rowCount) {
      const err = new Error('تعذر حذف الطلب');
      err.statusCode = 500;
      throw err;
    }
  });

  broadcastAdminEvent('orders-updated', {
    orderId,
    orderNumber: order.order_number,
    deleted: true,
    deletedBy: changedBy
  });

  return res.json({
    success: true,
    deleted: true,
    orderId,
    orderNumber: order.order_number,
    message: `تم حذف الطلب ${order.order_number}`
  });
}

function streamOrderEvents(req, res) {
  addAdminEventClient(req, res);
}

const CONTACT_STATUS_LABELS = {
  new: 'لم يتم الرد',
  unreplied: 'لم يتم الرد',
  replied: 'تم الرد'
};

const CONTACT_STATUS_EDITABLE = {
  unreplied: 'لم يتم الرد',
  replied: 'تم الرد'
};

async function listContactMessages(req, res) {
  const params = [];
  const where = [];
  const status = sanitizeText(req.query.status, 40);
  const queryText = sanitizeText(req.query.q, 160);
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit || '100', 10) || 100, 1), 500);

  if (status && status !== 'all') {
    where.push('status = ?');
    params.push(status);
  }

  if (queryText) {
    where.push(`(
      full_name ILIKE ?
      OR phone ILIKE ?
      OR COALESCE(address, '') ILIKE ?
      OR COALESCE(service_type, '') ILIKE ?
      OR message ILIKE ?
      OR ('دعم-' || id::text) ILIKE ?
    )`);
    const like = `%${queryText}%`;
    params.push(like, like, like, like, like, like);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  params.push(limit);

  const messages = await all(
    `SELECT id,
            ('دعم-' || id::text) AS "supportCode",
            full_name AS "fullName",
            phone,
            address,
            service_type AS "serviceType",
            message,
            status,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
     FROM contact_messages
     ${whereSql}
     ORDER BY created_at DESC
     LIMIT ?`,
    params
  );

  const countsRow = await get(
    `SELECT
       COUNT(*)::int AS total,
       COUNT(*) FILTER (WHERE status IN ('new', 'unreplied', 'seen'))::int AS "unrepliedCount",
       COUNT(*) FILTER (WHERE status = 'new')::int AS "newCount",
       COUNT(*) FILTER (WHERE created_at::date = CURRENT_DATE)::int AS today
     FROM contact_messages`
  );

  return res.json({
    success: true,
    kind: 'support_messages',
    messages: messages.map(row => ({
      ...row,
      kind: 'support_message',
      status: row.status === 'replied' ? 'replied' : 'unreplied',
      statusLabel: CONTACT_STATUS_LABELS[row.status] || row.status
    })),
    counts: {
      total: Number(countsRow?.total || 0),
      unreplied: Number(countsRow?.unrepliedCount || 0),
      new: Number(countsRow?.newCount || 0),
      today: Number(countsRow?.today || 0)
    },
    statuses: Object.entries(CONTACT_STATUS_EDITABLE).map(([statusKey, labelAr]) => ({
      status: statusKey,
      labelAr
    })),
    generatedAt: new Date().toISOString()
  });
}

async function updateContactMessageStatus(req, res) {
  const messageId = Number.parseInt(req.params.id, 10);
  let nextStatus = sanitizeText(req.body?.status, 40);
  if (nextStatus === 'new' || nextStatus === 'seen' || nextStatus === 'closed') {
    nextStatus = 'unreplied';
  }

  if (!Number.isInteger(messageId) || messageId <= 0) {
    return res.status(400).json({ success: false, error: 'معرّف الرسالة غير صالح' });
  }

  if (!CONTACT_STATUS_EDITABLE[nextStatus]) {
    return res.status(400).json({ success: false, error: 'حالة الرسالة غير صالحة. استخدم: تم الرد أو لم يتم الرد' });
  }

  const existing = await get('SELECT id, status FROM contact_messages WHERE id = ?', [messageId]);
  if (!existing) {
    return res.status(404).json({ success: false, error: 'الرسالة غير موجودة' });
  }

  await run(
    `UPDATE contact_messages
     SET status = ?, updated_at = NOW()
     WHERE id = ?`,
    [nextStatus, messageId]
  );

  broadcastAdminEvent('contact-messages-updated', {
    messageId,
    supportCode: `دعم-${messageId}`,
    kind: 'support_message',
    status: nextStatus
  });

  return res.json({
    success: true,
    messageId,
    supportCode: `دعم-${messageId}`,
    kind: 'support_message',
    status: nextStatus,
    statusLabel: CONTACT_STATUS_EDITABLE[nextStatus] || CONTACT_STATUS_LABELS[nextStatus]
  });
}

async function ackAdminHubSection(req, res) {
  const section = sanitizeText(req.body?.section, 40);
  if (section === 'support') {
    const result = await run(
      `UPDATE contact_messages
       SET status = 'unreplied', updated_at = NOW()
       WHERE status IN ('new', 'seen')`
    );
    broadcastAdminEvent('contact-messages-updated', { section: 'support', acked: true });
    return res.json({
      success: true,
      section,
      cleared: true,
      updated: result?.rowCount || 0
    });
  }

  if (section === 'customers') {
    const row = await get(`SELECT COALESCE(MAX(id), 0)::int AS "latestId" FROM customer_users`);
    return res.json({
      success: true,
      section,
      latestId: Number(row?.latestId || 0)
    });
  }

  if (section === 'orders') {
    return res.json({ success: true, section, cleared: true });
  }

  return res.status(400).json({ success: false, error: 'قسم غير معروف' });
}

async function deleteContactMessage(req, res) {
  const messageId = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(messageId) || messageId <= 0) {
    return res.status(400).json({ success: false, error: 'معرّف الرسالة غير صالح' });
  }

  const existing = await get('SELECT id FROM contact_messages WHERE id = ?', [messageId]);
  if (!existing) {
    return res.status(404).json({ success: false, error: 'الرسالة غير موجودة' });
  }

  await run('DELETE FROM contact_messages WHERE id = ?', [messageId]);

  broadcastAdminEvent('contact-messages-updated', {
    messageId,
    supportCode: `دعم-${messageId}`,
    kind: 'support_message',
    deleted: true
  });

  return res.json({
    success: true,
    deleted: true,
    messageId,
    supportCode: `دعم-${messageId}`,
    kind: 'support_message',
    message: `تم حذف رسالة الدعم دعم-${messageId}`
  });
}

async function listSavedCustomers(req, res) {
  const q = sanitizeText(req.query.q, 80);
  const limit = Math.min(Math.max(Number(req.query.limit) || 200, 1), 400);
  const params = [];
  let where = '';
  if (q) {
    where =
      `WHERE cu.email ILIKE ? OR COALESCE(cu.full_name, '') ILIKE ? OR COALESCE(cu.phone, '') ILIKE ?
        OR EXISTS (
          SELECT 1 FROM coupon_accounts ca
          WHERE ca.phone = cu.phone AND COALESCE(ca.book_number, '') ILIKE ?
        )`;
    const like = `%${q}%`;
    params.push(like, like, like, like);
  }
  params.push(limit);

  const rows = await all(
    `SELECT cu.id,
            cu.google_sub AS "googleSub",
            cu.email,
            cu.full_name AS "fullName",
            cu.avatar_url AS "avatarUrl",
            cu.phone,
            cu.created_at AS "createdAt",
            cu.updated_at AS "updatedAt",
            (
              SELECT ca.book_number
              FROM coupon_accounts ca
              WHERE ca.phone = cu.phone AND ca.service_type = 'external'
              ORDER BY ca.updated_at DESC
              LIMIT 1
            ) AS "bookNumber",
            (
              SELECT ca.remaining
              FROM coupon_accounts ca
              WHERE ca.phone = cu.phone AND ca.service_type = 'external'
              ORDER BY ca.updated_at DESC
              LIMIT 1
            ) AS "couponRemaining",
            (
              SELECT COUNT(*)::int FROM orders o
              WHERE COALESCE(o.customer_phone_snapshot, '') = COALESCE(cu.phone, '')
                AND cu.phone IS NOT NULL
            ) AS "ordersCount"
     FROM customer_users cu
     ${where}
     ORDER BY cu.updated_at DESC, cu.id DESC
     LIMIT ?`,
    params
  );

  const newToday = Number(
    (
      await get(
        `SELECT COUNT(*)::int AS total
         FROM customer_users
         WHERE created_at >= DATE_TRUNC('day', NOW())`
      )
    )?.total || 0
  );

  return res.json({
    success: true,
    customers: rows.map(row => ({
      ...row,
      couponRemaining: row.couponRemaining == null ? 0 : Number(row.couponRemaining),
      ordersCount: Number(row.ordersCount) || 0
    })),
    counts: {
      total: rows.length,
      newToday
    },
    generatedAt: new Date().toISOString()
  });
}

async function getAdminHubSummary(req, res) {
  const pendingOrders = Number(
    (await get(`SELECT COUNT(*)::int AS total FROM orders WHERE status = 'pending'`))?.total || 0
  );
  const newSupport = Number(
    (await get(`SELECT COUNT(*)::int AS total FROM contact_messages WHERE status = 'new'`))?.total ||
      0
  );
  const newCustomersToday = Number(
    (
      await get(
        `SELECT COUNT(*)::int AS total FROM customer_users WHERE created_at >= DATE_TRUNC('day', NOW())`
      )
    )?.total || 0
  );
  const customersLatestId = Number(
    (await get(`SELECT COALESCE(MAX(id), 0)::int AS "latestId" FROM customer_users`))?.latestId || 0
  );
  const customersTotal = Number(
    (await get(`SELECT COUNT(*)::int AS total FROM customer_users`))?.total || 0
  );
  const couponBooks = Number(
    (await get(`SELECT COUNT(*)::int AS total FROM coupon_accounts WHERE service_type = 'external'`))
      ?.total || 0
  );

  return res.json({
    success: true,
    sections: {
      orders: { newCount: pendingOrders, label: 'طلبات بانتظار المعالجة' },
      support: { newCount: newSupport, label: 'رسائل دعم جديدة' },
      customers: {
        newCount: newCustomersToday,
        latestId: customersLatestId,
        total: customersTotal,
        couponBooks,
        label: 'عملاء جدد اليوم'
      }
    },
    generatedAt: new Date().toISOString()
  });
}

module.exports = {
  listOrders,
  listOrderStatuses,
  updateOrderStatus,
  updateOrderDeliveryStatus,
  deleteOrder,
  streamOrderEvents,
  listContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
  ackAdminHubSection,
  listSavedCustomers,
  getAdminHubSummary
};
