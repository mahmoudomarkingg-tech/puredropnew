'use strict';

const crypto = require('node:crypto');
const { all, get, run, withTransaction } = require('../db/query');
const { broadcastAdminEvent } = require('../utils/sse');
const {
  sanitizeText,
  normalizePhone,
  isValidJordanPhone,
  money
} = require('../utils/helpers');
const {
  issueCreditsFromOrderItems,
  planCouponRedeemForOrder
} = require('../services/couponsService');

async function generateOrderNumber(client) {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const random = crypto.randomInt(1000, 10000);
    const orderNumber = `PD-${yyyy}${mm}${dd}-${random}`;
    const exists = await get('SELECT id FROM orders WHERE order_number = ?', [orderNumber], client);
    if (!exists) return orderNumber;
  }

  return `PD-${yyyy}${mm}${dd}-${Date.now().toString().slice(-6)}`;
}

async function createOrder(req, res) {
  const payload = req.body || {};
  const customerPayload = payload.customer || {};
  const customer = {
    name: sanitizeText(customerPayload.name || payload.name, 160),
    phone: normalizePhone(customerPayload.phone || payload.phone),
    address: sanitizeText(customerPayload.address || payload.address, 500),
    notes: sanitizeText(customerPayload.notes || payload.notes, 1000)
  };

  const rawLat = Number(customerPayload.lat ?? customerPayload.latitude ?? payload.lat ?? payload.latitude);
  const rawLng = Number(customerPayload.lng ?? customerPayload.longitude ?? payload.lng ?? payload.longitude);
  const locationLat = Number.isFinite(rawLat) ? rawLat : null;
  const locationLng = Number.isFinite(rawLng) ? rawLng : null;
  const locationMapsUrl =
    locationLat !== null && locationLng !== null
      ? `https://www.google.com/maps/dir/?api=1&destination=${locationLat},${locationLng}`
      : sanitizeText(customerPayload.mapsUrl || payload.mapsUrl, 500) || null;

  const itemsPayload = Array.isArray(payload.items) ? payload.items : [];
  const deliveryTimePreference = sanitizeText(payload.deliveryTime || payload.deliveryTimePreference, 80) || 'asap';

  if (!customer.name || !customer.phone || !customer.address) {
    return res.status(400).json({ success: false, error: 'الاسم ورقم الهاتف والعنوان حقول مطلوبة' });
  }

  if (!isValidJordanPhone(customer.phone)) {
    return res.status(400).json({
      success: false,
      error: 'رقم الهاتف يجب أن يبدأ بـ 07 ويتكون من 10 أو 11 رقمًا'
    });
  }

  if (locationLat !== null && (locationLat < -90 || locationLat > 90)) {
    return res.status(400).json({ success: false, error: 'إحداثيات الموقع غير صالحة' });
  }
  if (locationLng !== null && (locationLng < -180 || locationLng > 180)) {
    return res.status(400).json({ success: false, error: 'إحداثيات الموقع غير صالحة' });
  }

  if (!itemsPayload.length) {
    return res.status(400).json({ success: false, error: 'لا يمكن إنشاء طلب بدون منتجات' });
  }

  const preparedItems = [];
  for (const raw of itemsPayload) {
    const productId = Number(raw.id || raw.productId);
    const quantity = Number.parseInt(raw.qty || raw.quantity || 1, 10);
    const optionCode = sanitizeText(raw.optionId || raw.optionCode, 80) || null;

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({ success: false, error: 'رقم منتج غير صالح داخل الطلب' });
    }

    if (!Number.isInteger(quantity) || quantity <= 0 || quantity > 999) {
      return res.status(400).json({ success: false, error: 'كمية غير صالحة داخل الطلب' });
    }

    const product = await get(
      `SELECT id, name_ar, price, is_active
       FROM products
       WHERE id = ?`,
      [productId]
    );

    if (!product || Number(product.is_active) !== 1) {
      return res.status(400).json({ success: false, error: `المنتج رقم ${productId} غير متاح حالياً` });
    }

    let option = null;
    if (optionCode) {
      option = await get(
        `SELECT id, option_code, label_ar, price
         FROM product_options
         WHERE product_id = ? AND option_code = ?`,
        [productId, optionCode]
      );
      if (!option) {
        return res.status(400).json({
          success: false,
          error: `خيار المنتج غير صالح للمنتج رقم ${productId}`
        });
      }
    } else {
      option = await get(
        `SELECT id, option_code, label_ar, price
         FROM product_options
         WHERE product_id = ?
         ORDER BY is_default DESC, sort_order ASC, id ASC
         LIMIT 1`,
        [productId]
      );
    }

    const unitPrice = money(option ? option.price : product.price);
    const lineTotal = money(unitPrice * quantity);

    preparedItems.push({
      productId,
      productOptionId: option ? option.id : null,
      productName: product.name_ar,
      optionLabel: option ? option.label_ar : null,
      quantity,
      unitPrice,
      lineTotal
    });
  }

  const subtotal = money(preparedItems.reduce((sum, item) => sum + item.lineTotal, 0));
  const deliveryFee = money(Number((await get("SELECT value FROM settings WHERE key = 'delivery_fee'"))?.value || 0));
  const tax = 0;

  const couponPayload = payload.couponRedeem || payload.digitalCoupons || {};
  const requestedRedeemQty = Number.parseInt(couponPayload.quantity ?? couponPayload.qty ?? 0, 10) || 0;
  const requestedBookNumber = sanitizeText(
    couponPayload.bookNumber || couponPayload.book_number || couponPayload.code,
    40
  ) || null;

  let result;
  try {
    result = await withTransaction(async client => {
      const orderNumber = await generateOrderNumber(client);

      const insertedCustomer = await run(
        `INSERT INTO customers (full_name, phone, address, notes)
         VALUES (?, ?, ?, ?)
         RETURNING id`,
        [customer.name, customer.phone, customer.address, customer.notes],
        client
      );
      const customerId = insertedCustomer.rows[0].id;

      const insertedOrder = await run(
        `INSERT INTO orders
         (order_number, customer_id, status, delivery_time_preference,
          customer_name_snapshot, customer_phone_snapshot, customer_address_snapshot,
          location_lat, location_lng, location_maps_url,
          subtotal, delivery_fee, tax, coupon_discount, coupons_redeemed, coupon_service_type,
          total, currency, source, payment_method, payment_status, notes)
         VALUES (?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, NULL, ?, 'JOD', 'website', 'cash_on_delivery', 'unpaid', ?)
         RETURNING id`,
        [
          orderNumber,
          customerId,
          deliveryTimePreference,
          customer.name,
          customer.phone,
          customer.address,
          locationLat,
          locationLng,
          locationMapsUrl,
          subtotal,
          deliveryFee,
          tax,
          money(subtotal + deliveryFee + tax),
          customer.notes
        ],
        client
      );

      const orderId = insertedOrder.rows[0].id;

      for (const item of preparedItems) {
        await run(
          `INSERT INTO order_items
           (order_id, product_id, product_option_id, product_name_snapshot, option_label_snapshot, quantity, unit_price, line_total)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            orderId,
            item.productId,
            item.productOptionId,
            item.productName,
            item.optionLabel,
            item.quantity,
            item.unitPrice,
            item.lineTotal
          ],
          client
        );
      }

      // Issue digital book first so first-order pack+refill can use the new book number immediately.
      const issuedCoupons = await issueCreditsFromOrderItems({
        phone: customer.phone,
        customerName: customer.name,
        orderId,
        preparedItems,
        client
      });
      const issuedBookNumber = issuedCoupons.find(row => row.bookNumber)?.bookNumber || null;

      let couponDiscount = 0;
      let couponsRedeemed = 0;
      let couponServiceType = null;
      let couponBookNumber = null;
      let couponAccountId = null;
      let couponRedeemStatus = null;
      let availableAfterReserve = null;

      if (requestedRedeemQty > 0) {
        const planned = await planCouponRedeemForOrder({
          phone: customer.phone,
          customerName: customer.name,
          bookNumber: requestedBookNumber || issuedBookNumber || null,
          redeemQty: requestedRedeemQty,
          preparedItems,
          orderId,
          client
        });
        couponDiscount = money(planned.discount);
        couponsRedeemed = planned.redeemQty;
        couponServiceType = planned.serviceType;
        couponBookNumber = planned.bookNumber;
        couponAccountId = planned.accountId;
        couponRedeemStatus = planned.redeemStatus;
        availableAfterReserve = planned.availableAfterReserve;
      }

      const total = money(Math.max(0, subtotal - couponDiscount + deliveryFee + tax));
      const paymentStatus = total <= 0 ? 'paid' : 'unpaid';

      await run(
        `UPDATE orders
         SET coupon_discount = ?,
             coupons_redeemed = ?,
             coupon_service_type = ?,
             coupon_book_number = ?,
             coupon_account_id = ?,
             coupon_redeem_status = ?,
             total = ?,
             payment_status = ?
         WHERE id = ?`,
        [
          couponDiscount,
          couponsRedeemed,
          couponServiceType,
          couponBookNumber || issuedBookNumber,
          couponAccountId,
          couponRedeemStatus,
          total,
          paymentStatus,
          orderId
        ],
        client
      );

      const historyNote = couponsRedeemed > 0
        ? (couponRedeemStatus === 'applied'
          ? `تم إنشاء الطلب مع خصم فوري ${couponsRedeemed} كابون (دفتر ${couponBookNumber}) — عميل معتمد`
          : `تم إنشاء الطلب مع حجز ${couponsRedeemed} كابون رقمي (دفتر ${couponBookNumber}) — يُخصم بعد التسليم (أول استخدام)`)
        : 'تم إنشاء الطلب مباشرة من الموقع وحفظه في قاعدة البيانات';

      await run(
        `INSERT INTO order_status_history (order_id, old_status, new_status, note, changed_by)
         VALUES (?, NULL, 'pending', ?, 'الموقع الإلكتروني')`,
        [orderId, historyNote],
        client
      );

      await run(
        `INSERT INTO "متابعة_تسليم_الطلبات"
         ("معرف الطلب", "رقم الطلب", "هل تم التسليم", "تاريخ التسليم", "ملاحظات التسليم")
         VALUES (?, ?, 'لم يتم التسليم', NULL, NULL)
         ON CONFLICT ("معرف الطلب") DO NOTHING`,
        [orderId, orderNumber],
        client
      );

      return {
        success: true,
        orderId,
        orderNumber,
        status: 'pending',
        customerId,
        itemsCount: preparedItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal,
        deliveryFee,
        tax,
        couponDiscount,
        couponsRedeemed,
        couponServiceType,
        couponBookNumber,
        couponRedeemStatus,
        couponAvailableAfterReserve: availableAfterReserve,
        issuedCoupons,
        total,
        currency: 'JOD',
        paymentStatus
      };
    });
  } catch (error) {
    const status = error.statusCode || 500;
    if (status < 500) {
      return res.status(status).json({ success: false, error: error.message });
    }
    throw error;
  }

  broadcastAdminEvent('orders-updated', {
    orderId: result.orderId,
    orderNumber: result.orderNumber,
    status: 'pending'
  });

  if (result.issuedCoupons?.length || result.couponsRedeemed) {
    broadcastAdminEvent('coupons-updated', {
      phone: customer.phone,
      issued: result.issuedCoupons || [],
      pendingRedeem: result.couponsRedeemed || 0,
      bookNumber: result.couponBookNumber || null
    });
  }

  return res.status(201).json(result);
}

async function getOrderByNumber(req, res) {
  const orderNumber = decodeURIComponent(req.params.orderNumber);
  const phone = normalizePhone(req.query.phone);

  if (!phone) {
    return res.status(400).json({ success: false, error: 'يرجى إرسال رقم الهاتف للتحقق من الطلب' });
  }

  const row = await get(
    `SELECT o.order_number, o.status, o.total, o.currency, o.created_at,
            COALESCE(o.customer_name_snapshot, c.full_name) AS full_name,
            COALESCE(o.customer_phone_snapshot, c.phone) AS phone,
            COALESCE(o.customer_address_snapshot, c.address) AS address,
            o.location_lat, o.location_lng, o.location_maps_url
     FROM orders o
     JOIN customers c ON c.id = o.customer_id
     WHERE o.order_number = ? AND COALESCE(o.customer_phone_snapshot, c.phone) = ?`,
    [orderNumber, phone]
  );

  if (!row) {
    return res.status(404).json({ success: false, error: 'لم يتم العثور على طلب مطابق' });
  }

  const items = await all(
    `SELECT product_name_snapshot AS "productName", option_label_snapshot AS "optionLabel",
            quantity, unit_price AS "unitPrice", line_total AS "lineTotal"
     FROM order_items oi
     JOIN orders o ON o.id = oi.order_id
     WHERE o.order_number = ?
     ORDER BY oi.id ASC`,
    [orderNumber]
  );

  return res.json({ success: true, order: { ...row, items } });
}

module.exports = {
  createOrder,
  getOrderByNumber
};
