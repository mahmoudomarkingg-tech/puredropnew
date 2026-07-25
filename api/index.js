'use strict';

const { app } = require('../backend/app');
const { ensureDatabase } = require('../backend/db/init');

let readyPromise = null;

function ensureReady() {
  if (!readyPromise) {
    readyPromise = ensureDatabase().catch(error => {
      readyPromise = null;
      throw error;
    });
  }
  return readyPromise;
}

module.exports = async (req, res) => {
  try {
    await ensureReady();
    return app(req, res);
  } catch (error) {
    console.error('Vercel boot failed:', error.message);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
      success: false,
      error: 'تعذر الاتصال بقاعدة البيانات. تأكد من إعداد DATABASE_URL في Vercel.'
    }));
  }
};
