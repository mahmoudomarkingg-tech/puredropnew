'use strict';

const { all, get } = require('../db/query');

async function health(req, res) {
  const counts = {
    categories: Number((await get('SELECT COUNT(*)::int AS total FROM categories'))?.total || 0),
    products: Number((await get('SELECT COUNT(*)::int AS total FROM products'))?.total || 0),
    orders: Number((await get('SELECT COUNT(*)::int AS total FROM orders'))?.total || 0),
    contactMessages: Number((await get('SELECT COUNT(*)::int AS total FROM contact_messages'))?.total || 0),
    aiConversations: Number((await get('SELECT COUNT(*)::int AS total FROM ai_conversations'))?.total || 0),
    hydrationCalculations: Number((await get('SELECT COUNT(*)::int AS total FROM hydration_calculations'))?.total || 0),
    familyAdvisorCalculations: Number((await get('SELECT COUNT(*)::int AS total FROM family_advisor_calculations'))?.total || 0)
  };

  res.json({
    success: true,
    service: 'puredrop-api',
    database: 'postgresql',
    counts
  });
}

async function listCategories(req, res) {
  const categories = await all(
    `SELECT id, name_ar AS name, name_en AS "nameEn", description, icon, sort_order AS "sortOrder"
     FROM categories
     WHERE is_active = 1
     ORDER BY sort_order ASC`
  );
  res.json({ success: true, categories });
}

module.exports = {
  health,
  listCategories
};
