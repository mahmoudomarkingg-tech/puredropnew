'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { query, withTransaction } = require('./query');

const ROOT_DIR = path.resolve(__dirname, '../..');

const DEFAULT_CATEGORIES = [
  ['carton', 'كراتين المياه', 'Water Cartons', 'أكواب مياه معبأة ومناسبة للمناسبات والمدارس والرحلات', 'fas fa-box-open', 1],
  ['shrink', 'شرنك المياه', 'Shrink Packs', 'زجاجات مياه بأحجام متنوعة للاستخدام اليومي والعائلي', 'fas fa-cubes', 2],
  ['bottle', 'القوارير الكبيرة', 'Large Bottles', 'قوارير 18.9 لتر وتعبئة القوارير للمنازل والمكاتب', 'fas fa-jug-detergent', 3],
  ['ice', 'الثلج', 'Ice', 'ثلج نقي بأحجام مختلفة للمشروبات والمناسبات', 'fas fa-snowflake', 4],
  ['extras', 'الدفاتر الرقمية والمستلزمات', 'Digital Coupon Books & Extras', 'دفاتر كابونات رقمية خارجية ومضخات وفلاتر ومستلزمات المياه', 'fas fa-qrcode', 5]
];

async function seedFromJsonIfEmpty() {
  const countResult = await query('SELECT COUNT(*)::int AS total FROM products');
  if (Number(countResult.rows[0].total) > 0) return false;

  const seedPath = path.join(ROOT_DIR, 'database', 'seed-products.json');
  if (!fs.existsSync(seedPath)) {
    console.warn('[db] seed-products.json not found; skipping product seed');
    return false;
  }

  const products = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  if (!Array.isArray(products) || !products.length) return false;

  await withTransaction(async client => {
    for (const [id, nameAr, nameEn, description, icon, sortOrder] of DEFAULT_CATEGORIES) {
      await query(
        `INSERT INTO categories (id, name_ar, name_en, description, icon, sort_order, is_active)
         VALUES (?, ?, ?, ?, ?, ?, 1)
         ON CONFLICT (id) DO NOTHING`,
        [id, nameAr, nameEn, description, icon, sortOrder],
        client
      );
    }

    for (const [index, product] of products.entries()) {
      const slug = String(product.nameEn || product.name || `product-${product.id}`)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      await query(
        `INSERT INTO products (
           id, category_id, name_ar, name_en, slug, description, full_description,
           price, base_price, chilled_price, currency, emoji, image_path, badge,
           stock_quantity, is_active, is_featured, sort_order
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'JOD', ?, ?, ?, 999, 1, ?, ?)
         ON CONFLICT (id) DO NOTHING`,
        [
          product.id,
          product.category,
          product.name,
          product.nameEn || null,
          slug || `product-${product.id}`,
          product.description,
          product.fullDescription || null,
          product.price,
          product.basePrice ?? null,
          product.chilledPrice ?? null,
          product.emoji || null,
          product.image || null,
          product.badge || null,
          product.isFeatured ? 1 : (product.badge ? 1 : 0),
          index + 1
        ],
        client
      );

      const specs = product.specs || {};
      await query(
        `INSERT INTO product_specs (product_id, volume, weight, material, shelf_life, storage)
         VALUES (?, ?, ?, ?, ?, ?)
         ON CONFLICT (product_id) DO NOTHING`,
        [
          product.id,
          specs.volume || null,
          specs.weight || null,
          specs.material || null,
          specs.shelfLife || null,
          specs.storage || null
        ],
        client
      );

      const options = Array.isArray(product.options) ? product.options : [];
      for (const [optIndex, option] of options.entries()) {
        const isDefault = option.isDefault === true || option.is_default === 1 || option.id === 'normal' || (optIndex === 0 && !options.some(o => o.id === 'normal' || o.isDefault));
        await query(
          `INSERT INTO product_options (product_id, option_code, label_ar, price, description, is_default, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT (product_id, option_code) DO NOTHING`,
          [
            product.id,
            option.id,
            option.label,
            option.price,
            option.description || null,
            isDefault ? 1 : 0,
            optIndex + 1
          ],
          client
        );
      }

      const certifications = Array.isArray(specs.certifications) ? specs.certifications : [];
      for (const [certIndex, certification] of certifications.entries()) {
        await query(
          `INSERT INTO product_certifications (product_id, certification, sort_order)
           VALUES (?, ?, ?)
           ON CONFLICT (product_id, certification) DO NOTHING`,
          [product.id, certification, certIndex + 1],
          client
        );
      }

      const tips = Array.isArray(product.usageTips) ? product.usageTips : [];
      for (const [tipIndex, tip] of tips.entries()) {
        await query(
          `INSERT INTO product_usage_tips (product_id, tip, sort_order)
           VALUES (?, ?, ?)
           ON CONFLICT (product_id, tip) DO NOTHING`,
          [product.id, tip, tipIndex + 1],
          client
        );
      }
    }
  });

  console.log(`[db] Seeded ${products.length} products into PostgreSQL`);
  return true;
}

async function syncProductPricesFromSeed() {
  const seedPath = path.join(ROOT_DIR, 'database', 'seed-products.json');
  if (!fs.existsSync(seedPath)) return false;

  const products = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  if (!Array.isArray(products) || !products.length) return false;

  let updated = 0;
  await withTransaction(async client => {
    for (const [id, nameAr, nameEn, description, icon, sortOrder] of DEFAULT_CATEGORIES) {
      await query(
        `INSERT INTO categories (id, name_ar, name_en, description, icon, sort_order, is_active)
         VALUES (?, ?, ?, ?, ?, ?, 1)
         ON CONFLICT (id) DO UPDATE SET
           name_ar = EXCLUDED.name_ar,
           name_en = EXCLUDED.name_en,
           description = EXCLUDED.description,
           icon = EXCLUDED.icon,
           sort_order = EXCLUDED.sort_order`,
        [id, nameAr, nameEn, description, icon, sortOrder],
        client
      );
    }

    for (const [index, product] of products.entries()) {
      const slug = String(product.nameEn || product.name || `product-${product.id}`)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      const sortOrder = Number(product.sortOrder) || index + 1;

      await query(
        `INSERT INTO products (
           id, category_id, name_ar, name_en, slug, description, full_description,
           price, base_price, chilled_price, currency, emoji, image_path, badge,
           stock_quantity, is_active, is_featured, sort_order
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'JOD', ?, ?, ?, 999, 1, ?, ?)
         ON CONFLICT (id) DO UPDATE SET
           category_id = EXCLUDED.category_id,
           name_ar = EXCLUDED.name_ar,
           name_en = EXCLUDED.name_en,
           description = EXCLUDED.description,
           full_description = EXCLUDED.full_description,
           price = EXCLUDED.price,
           base_price = EXCLUDED.base_price,
           chilled_price = EXCLUDED.chilled_price,
           emoji = EXCLUDED.emoji,
           image_path = EXCLUDED.image_path,
           badge = EXCLUDED.badge,
           sort_order = EXCLUDED.sort_order,
           is_active = 1,
           updated_at = NOW()`,
        [
          product.id,
          product.category,
          product.name,
          product.nameEn || null,
          slug || `product-${product.id}`,
          product.description,
          product.fullDescription || null,
          product.price,
          product.basePrice ?? null,
          product.chilledPrice ?? null,
          product.emoji || null,
          product.image || null,
          product.badge || null,
          product.isFeatured ? 1 : product.badge ? 1 : 0,
          sortOrder
        ],
        client
      );

      if (product.specs) {
        await query(
          `INSERT INTO product_specs (product_id, volume, weight, material, shelf_life, storage)
           VALUES (?, ?, ?, ?, ?, ?)
           ON CONFLICT (product_id) DO UPDATE SET
             volume = COALESCE(EXCLUDED.volume, product_specs.volume),
             weight = COALESCE(EXCLUDED.weight, product_specs.weight),
             material = COALESCE(EXCLUDED.material, product_specs.material),
             shelf_life = COALESCE(EXCLUDED.shelf_life, product_specs.shelf_life),
             storage = COALESCE(EXCLUDED.storage, product_specs.storage)`,
          [
            product.id,
            product.specs.volume || null,
            product.specs.weight || null,
            product.specs.material || null,
            product.specs.shelfLife || null,
            product.specs.storage || null
          ],
          client
        );
      }

      const options = Array.isArray(product.options) ? product.options : [];
      for (const [optIndex, option] of options.entries()) {
        const isDefault =
          option.isDefault === true ||
          option.is_default === 1 ||
          option.id === 'normal' ||
          (optIndex === 0 && !options.some(o => o.id === 'normal' || o.isDefault));
        await query(
          `INSERT INTO product_options
             (product_id, option_code, label_ar, price, description, is_default, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT (product_id, option_code) DO UPDATE SET
             price = EXCLUDED.price,
             label_ar = EXCLUDED.label_ar,
             description = EXCLUDED.description,
             is_default = EXCLUDED.is_default,
             sort_order = EXCLUDED.sort_order`,
          [
            product.id,
            option.id,
            option.label,
            option.price,
            option.description || null,
            isDefault ? 1 : 0,
            optIndex + 1
          ],
          client
        );
      }
      updated += 1;
    }
  });

  console.log(`[db] Synced prices for ${updated} products from seed-products.json`);
  return true;
}

module.exports = {
  seedFromJsonIfEmpty,
  syncProductPricesFromSeed
};
