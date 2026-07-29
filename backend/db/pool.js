'use strict';

const { Pool } = require('pg');
const parse = require('pg-connection-string').parse;

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set in the .env file');
}

const rawDatabaseUrl = String(process.env.DATABASE_URL).trim();
if (!/^postgres(ql)?:\/\//i.test(rawDatabaseUrl)) {
  throw new Error(
    'DATABASE_URL غير صحيح. يجب أن يبدأ بـ postgresql:// ويحتوي على اسم المستخدم وكلمة المرور والعنوان كاملاً.'
  );
}

let parsedDb;
try {
  parsedDb = parse(rawDatabaseUrl);
} catch (error) {
  throw new Error(`DATABASE_URL غير قابل للقراءة: ${error.message}`);
}

if (!parsedDb.host || parsedDb.host === 'base' || parsedDb.host.length < 3) {
  throw new Error(
    'DATABASE_URL ناقص أو تالف. الصق الرابط الكامل من Render Connect (Internal أو External) كاملاً دون حذف أي جزء.'
  );
}

const useSsl = process.env.DB_SSL === 'true';
const rejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false';

const pool = new Pool({
  connectionString: rawDatabaseUrl,
  ssl: useSsl ? { rejectUnauthorized } : undefined,
  max: Number(process.env.DB_POOL_MAX || 10),
  idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS || 30000),
  connectionTimeoutMillis: Number(process.env.DB_CONNECT_TIMEOUT_MS || 10000)
});

console.log(`[db] Connecting to host="${parsedDb.host}" database="${parsedDb.database || ''}"`);

pool.on('error', err => {
  console.error('Unexpected PostgreSQL pool error:', err.message);
});

module.exports = pool;
