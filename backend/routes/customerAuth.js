'use strict';

const express = require('express');
const { authenticateCustomer } = require('../middleware/auth');
const {
  getAuthConfig,
  googleLogin,
  demoGoogleLogin,
  getMe,
  updateMe
} = require('../controllers/customerAuthController');

const router = express.Router();

router.get('/config', getAuthConfig);
router.post('/google', googleLogin);
router.post('/google-demo', demoGoogleLogin);
router.get('/me', authenticateCustomer, getMe);
router.patch('/me', authenticateCustomer, updateMe);

module.exports = router;
