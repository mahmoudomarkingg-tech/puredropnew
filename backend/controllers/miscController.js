'use strict';

const { run } = require('../db/query');
const {
  sanitizeText,
  normalizePhone,
  isValidJordanPhone
} = require('../utils/helpers');

async function createContactMessage(req, res) {
  const payload = req.body || {};
  const name = sanitizeText(payload.name || payload.fullName, 160);
  const phone = normalizePhone(payload.phone);
  const address = sanitizeText(payload.address, 500);
  const serviceType = sanitizeText(payload.serviceType, 160);
  const message = sanitizeText(payload.message, 2000);

  if (!name || !phone || !message) {
    return res.status(400).json({ success: false, error: 'الاسم ورقم الهاتف والرسالة حقول مطلوبة' });
  }

  if (!isValidJordanPhone(phone)) {
    return res.status(400).json({
      success: false,
      error: 'رقم الهاتف يجب أن يبدأ بـ 07 ويتكون من 10 أو 11 رقمًا'
    });
  }

  const result = await run(
    `INSERT INTO contact_messages (full_name, phone, address, service_type, message)
     VALUES (?, ?, ?, ?, ?)
     RETURNING id`,
    [name, phone, address, serviceType, message]
  );

  return res.status(201).json({
    success: true,
    messageId: result.rows[0].id,
    status: 'new'
  });
}

async function createAiConversationMessage(req, res) {
  const payload = req.body || {};
  const sessionId = sanitizeText(payload.sessionId, 120);
  const role = sanitizeText(payload.role, 20);
  const content = sanitizeText(payload.content, 4000);

  if (!['user', 'assistant'].includes(role) || !content) {
    return res.status(400).json({ success: false, error: 'بيانات محادثة المساعد غير صالحة' });
  }

  const result = await run(
    `INSERT INTO ai_conversations (session_id, role, content)
     VALUES (?, ?, ?)
     RETURNING id`,
    [sessionId, role, content]
  );

  return res.status(201).json({ success: true, messageId: result.rows[0].id });
}

async function createHydrationCalculation(req, res) {
  const payload = req.body || {};
  const weightKg = Number(payload.weightKg || payload.weight_kg);
  const activityLevel = sanitizeText(payload.activityLevel || payload.activity_level, 80);
  const recommendedLiters = Number(payload.recommendedLiters || payload.recommended_liters);
  const recommendedProduct = sanitizeText(payload.recommendedProduct || payload.recommended_product, 300);

  if (
    !Number.isFinite(weightKg) ||
    weightKg <= 0 ||
    !activityLevel ||
    !Number.isFinite(recommendedLiters) ||
    recommendedLiters <= 0
  ) {
    return res.status(400).json({ success: false, error: 'بيانات حاسبة الترطيب غير صالحة' });
  }

  const result = await run(
    `INSERT INTO hydration_calculations (weight_kg, activity_level, recommended_liters, recommended_product)
     VALUES (?, ?, ?, ?)
     RETURNING id`,
    [weightKg, activityLevel, recommendedLiters, recommendedProduct]
  );

  return res.status(201).json({ success: true, calculationId: result.rows[0].id });
}

async function createFamilyAdvisorCalculation(req, res) {
  const payload = req.body || {};
  const dailyLiters = Number(payload.dailyLiters || payload.daily_liters);
  const monthlyLiters = Number(payload.monthlyLiters || payload.monthly_liters);
  const monthlyBottles = Number.parseInt(payload.monthlyBottles || payload.monthly_bottles, 10);
  const servicePreference = sanitizeText(payload.servicePreference || payload.service_preference, 80);
  const bestFit = sanitizeText(payload.bestFit || payload.best_fit, 300);

  if (
    !Number.isFinite(dailyLiters) ||
    dailyLiters <= 0 ||
    !Number.isFinite(monthlyLiters) ||
    monthlyLiters <= 0 ||
    !Number.isInteger(monthlyBottles) ||
    monthlyBottles <= 0
  ) {
    return res.status(400).json({ success: false, error: 'بيانات مستشار القوارير غير صالحة' });
  }

  const result = await run(
    `INSERT INTO family_advisor_calculations (daily_liters, monthly_liters, monthly_bottles, service_preference, best_fit)
     VALUES (?, ?, ?, ?, ?)
     RETURNING id`,
    [dailyLiters, monthlyLiters, monthlyBottles, servicePreference, bestFit]
  );

  return res.status(201).json({ success: true, calculationId: result.rows[0].id });
}

module.exports = {
  createContactMessage,
  createAiConversationMessage,
  createHydrationCalculation,
  createFamilyAdvisorCalculation
};
