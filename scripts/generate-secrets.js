'use strict';

const crypto = require('node:crypto');

function randomSecret(bytes = 48) {
  return crypto.randomBytes(bytes).toString('base64url');
}

function randomPassword(length = 20) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';
  const bytes = crypto.randomBytes(length);
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += alphabet[bytes[i] % alphabet.length];
  }
  return out;
}

console.log('انسخ هذه القيم إلى ملف .env قبل الاستضافة:\n');
console.log(`JWT_SECRET=${randomSecret(48)}`);
console.log(`ADMIN_PASSWORD=${randomPassword(22)}`);
console.log(`POSTGRES_PASSWORD=${randomPassword(22)}`);
console.log('\nCORS_ORIGIN=https://your-domain.com');
