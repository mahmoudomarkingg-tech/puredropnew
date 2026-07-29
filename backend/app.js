'use strict';

require('dotenv').config();

const path = require('node:path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const {
  isProduction,
  requireEnv,
  assertProductionReady,
  getCorsOrigins,
  isVercel,
  normalizeDatabaseUrl
} = require('./config/env');
const { loginRateLimiter, apiRateLimiter } = require('./middleware/rateLimit');

normalizeDatabaseUrl();

if (!isVercel()) {
  // Railway sets PORT automatically.
  if (!process.env.PORT) process.env.PORT = '3000';
}
requireEnv('DATABASE_URL');
requireEnv('JWT_SECRET');
assertProductionReady();

const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const healthRoutes = require('./routes/index');
const catalogRoutes = require('./routes/catalog');
const ordersRoutes = require('./routes/orders');
const miscRoutes = require('./routes/misc');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const ROOT_DIR = path.resolve(__dirname, '..');
const app = express();

if (process.env.TRUST_PROXY === 'true' || isProduction() || isVercel()) {
  app.set('trust proxy', 1);
}

app.disable('x-powered-by');

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: getCorsOrigins(),
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '1mb' }));
app.use('/api', apiRateLimiter());
app.use('/api/admin/login', loginRateLimiter());

app.use('/api', healthRoutes);
app.use('/api', catalogRoutes);
app.use('/api', ordersRoutes);
app.use('/api', miscRoutes);
app.use('/api/admin', authRoutes);
app.use('/api/admin', adminRoutes);

const staticCache = (res, filePath) => {
  // Avoid long browser caches for site shell so Render updates appear quickly.
  if (/\.(png|jpe?g|jfif|webp)$/i.test(filePath)) {
    res.setHeader('Cache-Control', 'public, max-age=86400');
  } else if (/\.(css|js)$/i.test(filePath)) {
    res.setHeader('Cache-Control', 'public, max-age=60, must-revalidate');
  } else {
    res.setHeader('Cache-Control', 'no-cache');
  }
};

app.use('/images', express.static(path.join(ROOT_DIR, 'images'), {
  setHeaders: staticCache
}));

app.use('/admin', express.static(path.join(ROOT_DIR, 'admin'), {
  index: 'index.html',
  redirect: true,
  setHeaders: staticCache
}));

app.get(['/admin', '/admin/'], (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(ROOT_DIR, 'admin', 'index.html'), (err) => {
    if (err) next(err);
  });
});

app.get('/script.js', (req, res) => {
  staticCache(res, 'script.js');
  res.sendFile(path.join(ROOT_DIR, 'script.js'));
});

app.get('/style.css', (req, res) => {
  staticCache(res, 'style.css');
  res.sendFile(path.join(ROOT_DIR, 'style.css'));
});

app.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return notFoundHandler(req, res);
  if (req.path === '/admin' || req.path.startsWith('/admin/')) {
    res.setHeader('Cache-Control', 'no-cache');
    return res.sendFile(path.join(ROOT_DIR, 'admin', 'index.html'));
  }
  res.setHeader('Cache-Control', 'no-cache');
  return res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

app.use(errorHandler);

module.exports = {
  app,
  ROOT_DIR
};
