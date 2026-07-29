'use strict';

const { all, get } = require('../db/query');

function mapOption(option) {
  return {
    id: option.option_code,
    label: option.label_ar,
    labelEn: option.label_en,
    price: Number(option.price),
    description: option.description,
    isDefault: Boolean(option.is_default)
  };
}

function assembleProduct(row, extras = {}) {
  const options = extras.options || [];
  const specsRow = extras.specs || {};
  const certifications = extras.certifications || [];
  const usageTips = extras.usageTips || [];

  return {
    id: row.id,
    name: row.name_ar,
    nameEn: row.name_en,
    description: row.description,
    fullDescription: row.full_description,
    price: Number(row.price),
    basePrice: row.base_price === null ? null : Number(row.base_price),
    chilledPrice: row.chilled_price === null ? null : Number(row.chilled_price),
    currency: row.currency,
    category: row.category_id,
    categoryName: row.category_name_ar,
    emoji: row.emoji,
    image: row.image_path,
    options: options.length ? options : null,
    badge: row.badge,
    stockQuantity: row.stock_quantity,
    isActive: Boolean(row.is_active),
    isFeatured: Boolean(row.is_featured),
    specs: {
      volume: specsRow.volume || null,
      weight: specsRow.weight || null,
      material: specsRow.material || null,
      shelfLife: specsRow.shelf_life || null,
      storage: specsRow.storage || null,
      certifications
    },
    usageTips
  };
}

async function loadProductExtras(productIds) {
  const extrasById = new Map();
  for (const id of productIds) {
    extrasById.set(id, {
      options: [],
      specs: null,
      certifications: [],
      usageTips: []
    });
  }
  if (!productIds.length) return extrasById;

  const placeholders = productIds.map(() => '?').join(', ');

  const [optionsRows, specsRows, certRows, tipRows] = await Promise.all([
    all(
      `SELECT product_id, option_code, label_ar, label_en, price, description, is_default, sort_order
       FROM product_options
       WHERE product_id IN (${placeholders})
       ORDER BY sort_order ASC, id ASC`,
      productIds
    ),
    all(
      `SELECT product_id, volume, weight, material, shelf_life, storage
       FROM product_specs
       WHERE product_id IN (${placeholders})`,
      productIds
    ),
    all(
      `SELECT product_id, certification
       FROM product_certifications
       WHERE product_id IN (${placeholders})
       ORDER BY sort_order ASC, id ASC`,
      productIds
    ),
    all(
      `SELECT product_id, tip
       FROM product_usage_tips
       WHERE product_id IN (${placeholders})
       ORDER BY sort_order ASC, id ASC`,
      productIds
    )
  ]);

  for (const row of optionsRows) {
    extrasById.get(row.product_id)?.options.push(mapOption(row));
  }
  for (const row of specsRows) {
    const bucket = extrasById.get(row.product_id);
    if (bucket) bucket.specs = row;
  }
  for (const row of certRows) {
    extrasById.get(row.product_id)?.certifications.push(row.certification);
  }
  for (const row of tipRows) {
    extrasById.get(row.product_id)?.usageTips.push(row.tip);
  }

  return extrasById;
}

async function productFromRow(row) {
  const extrasById = await loadProductExtras([row.id]);
  return assembleProduct(row, extrasById.get(row.id));
}

async function listProducts(req, res) {
  const category = req.query.category;
  const includeInactive = req.query.includeInactive === '1';
  const params = [];
  const where = [];

  if (!includeInactive) where.push('p.is_active = 1');
  if (category && category !== 'all') {
    where.push('p.category_id = ?');
    params.push(category);
  }

  const rows = await all(
    `SELECT p.*, c.name_ar AS category_name_ar
     FROM products p
     JOIN categories c ON c.id = p.category_id
     ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
     ORDER BY p.sort_order ASC, p.id ASC`,
    params
  );

  const extrasById = await loadProductExtras(rows.map(row => row.id));
  const products = rows.map(row => assembleProduct(row, extrasById.get(row.id)));

  res.json({ success: true, products });
}

async function getProduct(req, res) {
  const row = await get(
    `SELECT p.*, c.name_ar AS category_name_ar
     FROM products p
     JOIN categories c ON c.id = p.category_id
     WHERE p.id = ?`,
    [Number(req.params.id)]
  );

  if (!row) {
    return res.status(404).json({ success: false, error: 'المنتج غير موجود' });
  }

  const product = await productFromRow(row);
  return res.json({ success: true, product });
}

module.exports = {
  listProducts,
  getProduct
};
