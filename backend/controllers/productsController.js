'use strict';

const { all, get } = require('../db/query');

async function productFromRow(row) {
  const options = (await all(
    `SELECT id, option_code, label_ar, label_en, price, description, is_default, sort_order
     FROM product_options
     WHERE product_id = ?
     ORDER BY sort_order ASC, id ASC`,
    [row.id]
  )).map(option => ({
    id: option.option_code,
    label: option.label_ar,
    labelEn: option.label_en,
    price: Number(option.price),
    description: option.description,
    isDefault: Boolean(option.is_default)
  }));

  const specsRow = (await get(
    `SELECT volume, weight, material, shelf_life, storage
     FROM product_specs
     WHERE product_id = ?`,
    [row.id]
  )) || {};

  const certifications = (await all(
    `SELECT certification
     FROM product_certifications
     WHERE product_id = ?
     ORDER BY sort_order ASC, id ASC`,
    [row.id]
  )).map(item => item.certification);

  const usageTips = (await all(
    `SELECT tip
     FROM product_usage_tips
     WHERE product_id = ?
     ORDER BY sort_order ASC, id ASC`,
    [row.id]
  )).map(item => item.tip);

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

  const products = [];
  for (const row of rows) {
    products.push(await productFromRow(row));
  }

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
