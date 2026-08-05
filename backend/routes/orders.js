'use strict';

const express = require('express');
const { asyncHandler } = require('../utils/helpers');
const { optionalCustomer } = require('../middleware/auth');
const ordersController = require('../controllers/ordersController');

const router = express.Router();

router.post('/orders', optionalCustomer, asyncHandler(ordersController.createOrder));
router.get('/orders/:orderNumber', asyncHandler(ordersController.getOrderByNumber));

module.exports = router;
