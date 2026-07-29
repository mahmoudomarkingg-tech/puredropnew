'use strict';

const fs = require('node:fs');
const path = require('node:path');
const bcrypt = require('bcryptjs');
const { pool, query, get } = require('./query');
const { seedFromJsonIfEmpty, syncProductPricesFromSeed } = require('./seed');

const ROOT_DIR = path.resolve(__dirname, '../..');

async function ensureSchema() {
  const schemaPath = path.join(ROOT_DIR, 'database', 'schema.sql');
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`PostgreSQL schema not found: ${schemaPath}`);
  }

  const sql = fs.readFileSync(schemaPath, 'utf8');
  await pool.query(sql);
}

async function ensureAdminUser() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const existing = await get(
    'SELECT id, password_hash FROM admins WHERE username = ?',
    [username]
  );

  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const plainPassword = process.env.ADMIN_PASSWORD;

  if (!existing) {
    let hash = passwordHash;
    if (!hash && plainPassword) {
      hash = await bcrypt.hash(plainPassword, 12);
    }

    if (!hash) {
      console.warn(
        '[auth] No admin user found. Set ADMIN_PASSWORD or ADMIN_PASSWORD_HASH in .env to create one.'
      );
      return;
    }

    await query(
      `INSERT INTO admins (username, password_hash)
       VALUES (?, ?)`,
      [username, hash]
    );

    console.log(`[auth] Created admin user "${username}"`);
    return;
  }

  // Keep DB password aligned with .env so local/admin credentials stay usable after edits.
  if (plainPassword) {
    const matched = await bcrypt.compare(plainPassword, existing.password_hash);
    if (!matched) {
      const hash = await bcrypt.hash(plainPassword, 12);
      await query('UPDATE admins SET password_hash = ? WHERE id = ?', [hash, existing.id]);
      console.log(`[auth] Updated password for admin "${username}" from .env`);
    }
  } else if (passwordHash && passwordHash !== existing.password_hash) {
    await query('UPDATE admins SET password_hash = ? WHERE id = ?', [
      passwordHash,
      existing.id
    ]);
    console.log(`[auth] Updated password hash for admin "${username}" from .env`);
  }
}

async function ensureDefaultSettings() {
  const defaults = [
    ['site_name_ar', 'قطرة نقية', 'اسم الموقع بالعربية'],
    ['site_name_en', 'PureDrop Water Solutions', 'اسم الموقع بالإنجليزية'],
    ['currency', 'JOD', 'عملة الأسعار'],
    ['delivery_fee', '0', 'رسوم التوصيل الافتراضية'],
    ['delivery_areas', 'عمّان، الزرقاء، إربد وباقي المحافظات الأردنية', 'مناطق التوصيل'],
    ['default_order_status', 'pending', 'حالة الطلب الافتراضية'],
    ['orders_destination', 'database', 'وجهة حفظ الطلبات'],
    ['admin_dashboard_path', '/admin/', 'رابط لوحة إدارة الطلبات']
  ];

  for (const [key, value, description] of defaults) {
    await query(
      `INSERT INTO settings (key, value, description)
       VALUES (?, ?, ?)
       ON CONFLICT (key) DO NOTHING`,
      [key, value, description]
    );
  }
}

async function ensureOrderDeliveryColumns() {
  const alters = [
    'ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_name_snapshot TEXT',
    'ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_phone_snapshot TEXT',
    'ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_address_snapshot TEXT',
    'ALTER TABLE orders ADD COLUMN IF NOT EXISTS location_lat DOUBLE PRECISION',
    'ALTER TABLE orders ADD COLUMN IF NOT EXISTS location_lng DOUBLE PRECISION',
    'ALTER TABLE orders ADD COLUMN IF NOT EXISTS location_maps_url TEXT'
  ];

  for (const sql of alters) {
    await pool.query(sql);
  }

  // Backfill snapshots for older orders from linked customer rows.
  await pool.query(`
    UPDATE orders o
    SET
      customer_name_snapshot = COALESCE(o.customer_name_snapshot, c.full_name),
      customer_phone_snapshot = COALESCE(o.customer_phone_snapshot, c.phone),
      customer_address_snapshot = COALESCE(o.customer_address_snapshot, c.address)
    FROM customers c
    WHERE c.id = o.customer_id
      AND (
        o.customer_name_snapshot IS NULL
        OR o.customer_phone_snapshot IS NULL
        OR o.customer_address_snapshot IS NULL
      )
  `);
}

async function ensureDatabase() {
  await ensureSchema();
  await ensureOrderDeliveryColumns();
  await ensureDefaultSettings();
  await ensureAdminUser();
  await seedFromJsonIfEmpty();
  await syncProductPricesFromSeed();
}

module.exports = {
  ensureDatabase,
  ensureSchema,
  ensureAdminUser
};
