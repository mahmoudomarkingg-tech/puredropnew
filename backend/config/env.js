'use strict';

function isProduction() {
  return String(process.env.NODE_ENV || '').toLowerCase() === 'production';
}

function isVercel() {
  return process.env.VERCEL === '1' || Boolean(process.env.VERCEL_URL);
}

function isRailway() {
  return Boolean(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID);
}

function normalizeDatabaseUrl() {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim()) {
    return process.env.DATABASE_URL.trim();
  }

  const aliases = [
    process.env.DATABASE_PRIVATE_URL,
    process.env.DATABASE_PUBLIC_URL,
    process.env.POSTGRES_URL,
    process.env.POSTGRES_PRIVATE_URL,
    process.env.PGDATABASE_URL
  ];

  for (const value of aliases) {
    if (value && String(value).trim()) {
      process.env.DATABASE_URL = String(value).trim();
      return process.env.DATABASE_URL;
    }
  }

  // Build from discrete Railway/Postgres parts if provided.
  const user = process.env.PGUSER || process.env.POSTGRES_USER;
  const password = process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD;
  const host = process.env.PGHOST || process.env.POSTGRES_HOST;
  const port = process.env.PGPORT || process.env.POSTGRES_PORT || '5432';
  const database = process.env.PGDATABASE || process.env.POSTGRES_DB;

  if (user && password && host && database) {
    const url = `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
    process.env.DATABASE_URL = url;
    return url;
  }

  return '';
}

function listDbRelatedEnvKeys() {
  return Object.keys(process.env)
    .filter(key => /(DATABASE|POSTGRES|PGHOST|PGUSER|PGPASSWORD|PGDATABASE|PGPORT)/i.test(key))
    .sort();
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value || !String(value).trim()) {
    if (name === 'DATABASE_URL') {
      const found = listDbRelatedEnvKeys();
      const hint = found.length
        ? `المفاتيح الموجودة حالياً: ${found.join(', ')}`
        : 'لا يوجد أي متغير متعلق بقاعدة البيانات في خدمة الموقع.';
      throw new Error(
        `DATABASE_URL غير موجودة في خدمة الموقع. ${hint} على Railway: افتح خدمة الموقع → Variables → Add Variable Reference → DATABASE_URL من PostgreSQL ثم Redeploy.`
      );
    }
    throw new Error(`${name} must be set in the environment / .env file`);
  }
  return String(value).trim();
}

function assertProductionReady() {
  if (!isProduction() && !isVercel() && !isRailway()) return;

  const jwtSecret = requireEnv('JWT_SECRET');
  if (jwtSecret.length < 32) {
    throw new Error('In production, JWT_SECRET must be at least 32 characters');
  }
  if (/dev-secret|change-me|change_me|changeme/i.test(jwtSecret)) {
    throw new Error('In production, JWT_SECRET must not use a placeholder/dev value');
  }

  normalizeDatabaseUrl();
  requireEnv('DATABASE_URL');

  const corsOrigin = process.env.CORS_ORIGIN || '*';
  const hasHostedDomain = Boolean(
    process.env.VERCEL_URL ||
    process.env.RAILWAY_PUBLIC_DOMAIN ||
    process.env.RAILWAY_STATIC_URL
  );
  if (corsOrigin === '*' && !hasHostedDomain) {
    throw new Error('In production, set CORS_ORIGIN to your real domain (not *)');
  }

  const adminPassword = process.env.ADMIN_PASSWORD || '';
  const adminHash = process.env.ADMIN_PASSWORD_HASH || '';
  if (!adminHash && (!adminPassword || /changemenow|password|123456/i.test(adminPassword))) {
    throw new Error('In production, set a strong ADMIN_PASSWORD or ADMIN_PASSWORD_HASH');
  }
}

function getCorsOrigins() {
  const origins = new Set();
  const raw = process.env.CORS_ORIGIN || '';

  if (raw && raw !== '*') {
    raw.split(',').map(value => value.trim()).filter(Boolean).forEach(value => origins.add(value));
  }

  if (process.env.VERCEL_URL) {
    origins.add(`https://${process.env.VERCEL_URL}`);
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    origins.add(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  if (process.env.RAILWAY_PUBLIC_DOMAIN) {
    origins.add(`https://${process.env.RAILWAY_PUBLIC_DOMAIN}`);
  }
  if (process.env.RAILWAY_STATIC_URL) {
    const value = String(process.env.RAILWAY_STATIC_URL).trim();
    origins.add(value.startsWith('http') ? value : `https://${value}`);
  }

  if (!origins.size) {
    return raw === '*' || !raw ? true : false;
  }

  return Array.from(origins);
}

module.exports = {
  isProduction,
  isVercel,
  isRailway,
  normalizeDatabaseUrl,
  requireEnv,
  assertProductionReady,
  getCorsOrigins
};
