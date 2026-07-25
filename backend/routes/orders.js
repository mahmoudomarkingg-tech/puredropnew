'use strict';

const express = require('express');
const { asyncHandler } = require('../utils/helpers');
const ordersController = require('../controllers/ordersController');

const router = express.Router();

router.post('/orders', asyncHandler(ordersController.createOrder));
router.get('/orders/:orderNumber', asyncHandler(ordersController.getOrderByNumber));

module.exports = router;
