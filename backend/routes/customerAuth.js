'use strict';

const express = require('express');
const { authenticateCustomer } = require('../middleware/auth');
const { asyncHandler } = require('../utils/helpers');
const {
  getAuthConfig,
  googleLogin,
  googleRedirectLogin,
  demoGoogleLogin,
  registerWithEmail,
  loginWithEmail,
  getMe,
  updateMe,
  listMyOrders
} = require('../controllers/customerAuthController');

const router = express.Router();

router.get('/config', getAuthConfig);
router.post('/google', googleLogin);
router.post(
  '/google/redirect',
  express.urlencoded({ extended: false }),
  googleRedirectLogin
);
router.post('/google-demo', demoGoogleLogin);
router.post('/register', registerWithEmail);
router.post('/login', loginWithEmail);
router.get('/me', authenticateCustomer, getMe);
router.patch('/me', authenticateCustomer, updateMe);
router.get('/my-orders', authenticateCustomer, asyncHandler(listMyOrders));

module.exports = router;
