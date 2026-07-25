'use strict';

const pool = require('./pool');

function toPgPlaceholders(sql) {
  let index = 0;
  return sql.replace(/\?/g, () => `$${++index}`);
}

async function query(sql, params = [], client = null) {
  const runner = client || pool;
  return runner.query(toPgPlaceholders(sql), params);
}

async function all(sql, params = [], client = null) {
  const result = await query(sql, params, client);
  return result.rows;
}

async function get(sql, params = [], client = null) {
  const rows = await all(sql, params, client);
  return rows[0] || null;
}

async function run(sql, params = [], client = null) {
  return query(sql, params, client);
}

async function withTransaction(fn) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch {
      // ignore rollback errors
    }
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  query,
  all,
  get,
  run,
  withTransaction,
  toPgPlaceholders
};
