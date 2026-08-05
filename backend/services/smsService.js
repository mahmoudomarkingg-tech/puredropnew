'use strict';

/**
 * Optional SMS after delivery.
 * Configure one of:
 *   SMS_PROVIDER=twilio  + TWILIO_ACCOUNT_SID + TWILIO_AUTH_TOKEN + TWILIO_FROM
 *   SMS_PROVIDER=http    + SMS_API_URL (+ optional SMS_API_KEY, SMS_API_FIELD_TO, SMS_API_FIELD_BODY)
 * If unset / incomplete → logs only (does not fail the delivery update).
 */

function digitsOnly(value) {
  return String(value || '').replace(/\D/g, '');
}

function toE164Jordan(phone) {
  const d = digitsOnly(phone);
  if (!d) return null;
  if (d.startsWith('962') && d.length >= 12) return `+${d}`;
  if (d.startsWith('07') && d.length >= 10) return `+962${d.slice(1)}`;
  if (d.startsWith('7') && d.length >= 9) return `+962${d}`;
  if (String(phone || '').trim().startsWith('+')) return String(phone).trim();
  return null;
}

function buildDeliverySms(orderNumber) {
  const brand = process.env.SMS_BRAND_NAME || 'قطرة نقية';
  const num = orderNumber || '';
  return `${brand}: تم تسليم طلبك رقم ${num} بنجاح. شكراً لثقتك بنا.`;
}

async function sendViaTwilio(to, body) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  if (!sid || !token || !from) {
    return { ok: false, skipped: true, reason: 'twilio_env_missing' };
  }
  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const auth = Buffer.from(`${sid}:${token}`).toString('base64');
  const form = new URLSearchParams({ To: to, From: from, Body: body });
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: form.toString()
  });
  const text = await res.text();
  if (!res.ok) {
    return { ok: false, reason: `twilio_${res.status}`, detail: text.slice(0, 300) };
  }
  return { ok: true, provider: 'twilio' };
}

async function sendViaHttp(to, body) {
  const apiUrl = process.env.SMS_API_URL;
  if (!apiUrl) return { ok: false, skipped: true, reason: 'sms_api_url_missing' };

  const toField = process.env.SMS_API_FIELD_TO || 'to';
  const bodyField = process.env.SMS_API_FIELD_BODY || 'message';
  const payload = {
    [toField]: to,
    [bodyField]: body
  };
  if (process.env.SMS_API_EXTRA_JSON) {
    try {
      Object.assign(payload, JSON.parse(process.env.SMS_API_EXTRA_JSON));
    } catch {
      /* ignore bad extra json */
    }
  }

  const headers = { 'Content-Type': 'application/json' };
  if (process.env.SMS_API_KEY) {
    headers.Authorization = `Bearer ${process.env.SMS_API_KEY}`;
  }

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
  const text = await res.text();
  if (!res.ok) {
    return { ok: false, reason: `http_${res.status}`, detail: text.slice(0, 300) };
  }
  return { ok: true, provider: 'http' };
}

async function sendSms({ phone, message }) {
  const provider = String(process.env.SMS_PROVIDER || '').trim().toLowerCase();
  const to = toE164Jordan(phone);
  if (!to) {
    return { ok: false, skipped: true, reason: 'invalid_phone' };
  }
  if (!message) {
    return { ok: false, skipped: true, reason: 'empty_message' };
  }

  if (!provider || provider === 'off' || provider === 'none' || provider === 'log') {
    console.info('[sms] skipped (provider off/log):', { to, message });
    return { ok: true, skipped: true, provider: provider || 'log' };
  }

  try {
    if (provider === 'twilio') return await sendViaTwilio(to, message);
    if (provider === 'http') return await sendViaHttp(to, message);
    console.warn('[sms] unknown SMS_PROVIDER:', provider);
    return { ok: false, skipped: true, reason: 'unknown_provider' };
  } catch (error) {
    console.error('[sms] send failed:', error.message);
    return { ok: false, reason: error.message };
  }
}

async function notifyCustomerDelivered(order) {
  const phone =
    order?.customerPhone ||
    order?.customer_phone ||
    order?.customer_phone_snapshot ||
    order?.phone ||
    null;
  const orderNumber = order?.orderNumber || order?.order_number || '';
  if (!phone) {
    return { ok: false, skipped: true, reason: 'no_phone' };
  }
  return sendSms({
    phone,
    message: buildDeliverySms(orderNumber)
  });
}

module.exports = {
  sendSms,
  notifyCustomerDelivered,
  toE164Jordan,
  buildDeliverySms
};
