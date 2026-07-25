'use strict';

const express = require('express');
const { asyncHandler } = require('../utils/helpers');
const miscController = require('../controllers/miscController');

const router = express.Router();

router.post('/contact-messages', asyncHandler(miscController.createContactMessage));
router.post('/ai-conversations', asyncHandler(miscController.createAiConversationMessage));
router.post('/hydration-calculations', asyncHandler(miscController.createHydrationCalculation));
router.post('/family-advisor-calculations', asyncHandler(miscController.createFamilyAdvisorCalculation));

module.exports = router;
