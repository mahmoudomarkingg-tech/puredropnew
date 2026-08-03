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
    'ALTER TABLE orders ADD COLUMN IF NOT EXISTS location_maps_url TEXT',
    'ALTER TABLE orders ADD COLUMN IF NOT EXISTS coupon_discount NUMERIC(12, 2) NOT NULL DEFAULT 0',
    'ALTER TABLE orders ADD COLUMN IF NOT EXISTS coupons_redeemed INTEGER NOT NULL DEFAULT 0',
    'ALTER TABLE orders ADD COLUMN IF NOT EXISTS coupon_service_type TEXT',
    'ALTER TABLE orders ADD COLUMN IF NOT EXISTS coupon_book_number TEXT',
    'ALTER TABLE orders ADD COLUMN IF NOT EXISTS coupon_account_id INTEGER',
    "ALTER TABLE orders ADD COLUMN IF NOT EXISTS coupon_redeem_status TEXT"
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

async function ensureCustomerUsersTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS customer_users (
      id SERIAL PRIMARY KEY,
      google_sub TEXT UNIQUE,
      email TEXT NOT NULL,
      full_name TEXT,
      avatar_url TEXT,
      phone TEXT,
      password_hash TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  // Allow email/password accounts alongside Google (google_sub optional).
  await pool.query(`ALTER TABLE customer_users ALTER COLUMN google_sub DROP NOT NULL`);
  await pool.query(`ALTER TABLE customer_users ADD COLUMN IF NOT EXISTS password_hash TEXT`);
  await pool.query('CREATE INDEX IF NOT EXISTS idx_customer_users_phone ON customer_users(phone)');
  await pool.query('CREATE INDEX IF NOT EXISTS idx_customer_users_email ON customer_users(email)');
}

async function ensureDigitalCouponsTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS coupon_accounts (
      id SERIAL PRIMARY KEY,
      phone TEXT NOT NULL,
      customer_name TEXT,
      service_type TEXT NOT NULL CHECK (service_type IN ('external', 'internal')),
      book_number TEXT,
      remaining INTEGER NOT NULL DEFAULT 0 CHECK (remaining >= 0),
      total_issued INTEGER NOT NULL DEFAULT 0 CHECK (total_issued >= 0),
      total_redeemed INTEGER NOT NULL DEFAULT 0 CHECK (total_redeemed >= 0),
      status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'blocked')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (phone, service_type)
    )
  `);
  await pool.query(`ALTER TABLE coupon_accounts ADD COLUMN IF NOT EXISTS book_number TEXT`);
  await pool.query(
    `ALTER TABLE coupon_accounts ADD COLUMN IF NOT EXISTS applied_redeem_count INTEGER NOT NULL DEFAULT 0`
  );
  await pool.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_coupon_accounts_book_number_unique
    ON coupon_accounts (book_number)
    WHERE book_number IS NOT NULL
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS coupon_ledger (
      id SERIAL PRIMARY KEY,
      account_id INTEGER NOT NULL REFERENCES coupon_accounts(id) ON DELETE CASCADE,
      entry_type TEXT NOT NULL CHECK (entry_type IN ('issue', 'redeem', 'adjust', 'cancel')),
      quantity INTEGER NOT NULL,
      order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
      note TEXT,
      created_by TEXT NOT NULL DEFAULT 'system',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await pool.query('CREATE INDEX IF NOT EXISTS idx_coupon_accounts_phone ON coupon_accounts(phone)');
  await pool.query('CREATE INDEX IF NOT EXISTS idx_coupon_ledger_account_id ON coupon_ledger(account_id)');
  await pool.query('CREATE INDEX IF NOT EXISTS idx_coupon_ledger_order_id ON coupon_ledger(order_id)');
  await pool.query(`
    UPDATE categories
    SET name_ar = 'الدفاتر الرقمية والمستلزمات',
        name_en = 'Digital Coupon Books & Extras',
        description = 'دفاتر كابونات رقمية خارجية ومضخات وفلاتر ومستلزمات المياه',
        icon = 'fas fa-qrcode'
    WHERE id = 'extras'
  `);

  // Backfill book numbers for existing external accounts.
  const missing = await pool.query(
    `SELECT id FROM coupon_accounts WHERE book_number IS NULL OR BTRIM(book_number) = ''`
  );
  for (const row of missing.rows) {
    let code = null;
    for (let attempt = 0; attempt < 8; attempt += 1) {
      const candidate = `EXT-${100000 + Math.floor(Math.random() * 900000)}`;
      const exists = await pool.query(
        'SELECT 1 FROM coupon_accounts WHERE book_number = $1 LIMIT 1',
        [candidate]
      );
      if (!exists.rowCount) {
        code = candidate;
        break;
      }
    }
    if (!code) code = `EXT-${Date.now().toString().slice(-8)}${row.id}`;
    await pool.query('UPDATE coupon_accounts SET book_number = $1, updated_at = NOW() WHERE id = $2', [
      code,
      row.id
    ]);
  }
}

async function ensureDatabase() {
  await ensureSchema();
  await ensureOrderDeliveryColumns();
  await ensureCustomerUsersTable();
  await ensureDigitalCouponsTables();
  await ensureDefaultSettings();
  await ensureAdminUser();
  await seedFromJsonIfEmpty();
  // Avoid rewriting every product on every boot (faster cold start on Render).
  // Set SYNC_PRODUCTS_ON_BOOT=true to force a full price/options sync.
  if (String(process.env.SYNC_PRODUCTS_ON_BOOT || '').toLowerCase() === 'true') {
    await syncProductPricesFromSeed();
  } else {
    // Sync once per process only when seed is newer than last sync marker in memory,
    // or when FORCE_SYNC_PRODUCTS=1. Default: sync on first boot of this process.
    if (!global.__puredropPricesSynced) {
      await syncProductPricesFromSeed();
      global.__puredropPricesSynced = true;
    }
  }
}

module.exports = {
  ensureDatabase,
  ensureSchema,
  ensureAdminUser
};
