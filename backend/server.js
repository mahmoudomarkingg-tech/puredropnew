'use strict';

const { app } = require('./app');
const { ensureDatabase } = require('./db/init');
const { pool } = require('./db/query');
const { isProduction, isVercel } = require('./config/env');

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';

async function start() {
  await ensureDatabase();

  app.listen(PORT, HOST, () => {
    const mode = isProduction() ? 'production' : 'development';
    console.log(`PureDrop site is running on http://${HOST}:${PORT} (${mode})`);
    console.log('Database: PostgreSQL (DATABASE_URL)');
    console.log(`Admin panel: http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}/admin/`);
  });
}

if (!isVercel()) {
  start().catch(error => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  });

  async function shutdown(signal) {
    console.log(`Received ${signal}, shutting down...`);
    try {
      await pool.end();
    } finally {
      process.exit(0);
    }
  }

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

module.exports = app;
