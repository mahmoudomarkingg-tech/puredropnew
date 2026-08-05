'use strict';

const express = require('express');
const { authenticateStaff } = require('../middleware/auth');
const { asyncHandler } = require('../utils/helpers');
const staffController = require('../controllers/staffController');
const { loginRateLimiter } = require('../middleware/rateLimit');

const router = express.Router();

router.post('/login', loginRateLimiter(), asyncHandler(staffController.login));
router.get('/me', authenticateStaff, asyncHandler(staffController.me));
router.get('/orders', authenticateStaff, asyncHandler(staffController.listOrders));
router.post('/orders/:id/deliver', authenticateStaff, asyncHandler(staffController.markDelivered));
router.patch('/orders/:id/deliver', authenticateStaff, asyncHandler(staffController.markDelivered));

module.exports = router;
