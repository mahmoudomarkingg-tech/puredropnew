'use strict';

const express = require('express');
const { authenticateCustomer } = require('../middleware/auth');
const {
  getAuthConfig,
  googleLogin,
  demoGoogleLogin,
  registerWithEmail,
  loginWithEmail,
  getMe,
  updateMe
} = require('../controllers/customerAuthController');

const router = express.Router();

router.get('/config', getAuthConfig);
router.post('/google', googleLogin);
router.post('/google-demo', demoGoogleLogin);
router.post('/register', registerWithEmail);
router.post('/login', loginWithEmail);
router.get('/me', authenticateCustomer, getMe);
router.patch('/me', authenticateCustomer, updateMe);

module.exports = router;
