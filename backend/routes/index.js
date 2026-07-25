'use strict';

const express = require('express');
const { asyncHandler } = require('../utils/helpers');
const { health } = require('../controllers/healthController');

const router = express.Router();

router.get('/health', asyncHandler(health));

module.exports = router;
