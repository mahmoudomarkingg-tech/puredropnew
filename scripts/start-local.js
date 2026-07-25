'use strict';

/**
 * Starts an embedded PostgreSQL cluster for local testing,
 * then boots the PureDrop Express server.
 */
const path = require('node:path');
const fs = require('node:fs');
const { spawn } = require('node:child_process');

async function main() {
  const EmbeddedPostgres = require('embedded-postgres').default;
  const rootDir = path.resolve(__dirname, '..');
  const databaseDir = path.join(rootDir, 'data', 'pg');
  const user = process.env.EMBEDDED_PG_USER || 'postgres';
  const password = process.env.EMBEDDED_PG_PASSWORD || 'ChangeMeNow123!';
  const port = Number(process.env.EMBEDDED_PG_PORT || 5432);
  const dbName = process.env.EMBEDDED_PG_DATABASE || 'puredrop';

  fs.mkdirSync(databaseDir, { recursive: true });

  const pg = new EmbeddedPostgres({
    databaseDir,
    user,
    password,
    port,
    persistent: true,
    initdbFlags: ['--encoding=UTF8', '--locale=C'],
    onLog: (message) => {
      if (String(message).trim()) {
        console.log(`[postgres] ${String(message).trim()}`);
      }
    },
    onError: (message) => {
      console.error(`[postgres] ${String(message)}`);
    }
  });

  const alreadyInitialized = fs.existsSync(path.join(databaseDir, 'PG_VERSION'));
  if (!alreadyInitialized) {
    console.log('[local] Initializing embedded PostgreSQL...');
    await pg.initialise();
  }

  console.log(`[local] Starting embedded PostgreSQL on port ${port}...`);
  await pg.start();

  try {
    await pg.createDatabase(dbName);
    console.log(`[local] Created database "${dbName}"`);
  } catch (error) {
    const text = String(error?.message || error);
    if (!/already exists/i.test(text)) {
      console.warn(`[local] createDatabase note: ${text}`);
    }
  }

  process.env.DATABASE_URL = `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@127.0.0.1:${port}/${dbName}`;
  process.env.DB_SSL = 'false';

  const server = spawn(process.execPath, [path.join(rootDir, 'backend', 'server.js')], {
    cwd: rootDir,
    env: process.env,
    stdio: 'inherit'
  });

  const shutdown = async (signal) => {
    console.log(`\n[local] Received ${signal}, shutting down...`);
    if (!server.killed) {
      server.kill('SIGTERM');
    }
    try {
      await pg.stop();
    } catch (error) {
      console.error('[local] Failed to stop PostgreSQL:', error.message || error);
    }
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  server.on('exit', async (code) => {
    try {
      await pg.stop();
    } catch {
      // ignore
    }
    process.exit(code ?? 1);
  });
}

main().catch((error) => {
  console.error('[local] Failed to start:', error.message || error);
  process.exit(1);
});
