'use strict';

function notFoundHandler(req, res) {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success: false, error: 'مسار API غير موجود' });
  }
  return res.status(404).send('Not Found');
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  if (statusCode >= 500) {
    console.error(err);
  }
  res.status(statusCode).json({
    success: false,
    error: err.message || 'حدث خطأ غير متوقع'
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
