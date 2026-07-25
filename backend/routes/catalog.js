'use strict';

const express = require('express');
const { asyncHandler } = require('../utils/helpers');
const productsController = require('../controllers/productsController');
const { listCategories } = require('../controllers/healthController');

const router = express.Router();

router.get('/categories', asyncHandler(listCategories));
router.get('/products', asyncHandler(productsController.listProducts));
router.get('/products/:id', asyncHandler(productsController.getProduct));

module.exports = router;
