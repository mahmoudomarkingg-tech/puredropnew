'use strict';

const express = require('express');
const { asyncHandler } = require('../utils/helpers');
const couponsController = require('../controllers/couponsController');

const router = express.Router();

router.get('/coupons/balance', asyncHandler(couponsController.getPublicBalance));
router.post('/coupons/balance', asyncHandler(couponsController.getPublicBalance));

module.exports = router;
