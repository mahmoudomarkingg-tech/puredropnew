'use strict';

const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { asyncHandler } = require('../utils/helpers');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', asyncHandler(authController.login));
router.get('/me', authenticateToken, asyncHandler(authController.me));

module.exports = router;
