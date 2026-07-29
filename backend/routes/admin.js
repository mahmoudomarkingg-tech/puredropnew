'use strict';

const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { asyncHandler } = require('../utils/helpers');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.use(authenticateToken);

router.get('/orders/events', adminController.streamOrderEvents);
router.get('/orders', asyncHandler(adminController.listOrders));
router.get('/order-statuses', asyncHandler(adminController.listOrderStatuses));
router.patch('/orders/:id/status', asyncHandler(adminController.updateOrderStatus));
router.post('/orders/:id/status', asyncHandler(adminController.updateOrderStatus));
router.patch('/orders/:id/delivery', asyncHandler(adminController.updateOrderDeliveryStatus));
router.post('/orders/:id/delivery', asyncHandler(adminController.updateOrderDeliveryStatus));
router.delete('/orders/:id', asyncHandler(adminController.deleteOrder));
router.post('/orders/:id/delete', asyncHandler(adminController.deleteOrder));

router.get('/contact-messages', asyncHandler(adminController.listContactMessages));
router.patch('/contact-messages/:id/status', asyncHandler(adminController.updateContactMessageStatus));
router.post('/contact-messages/:id/status', asyncHandler(adminController.updateContactMessageStatus));
router.delete('/contact-messages/:id', asyncHandler(adminController.deleteContactMessage));
router.post('/contact-messages/:id/delete', asyncHandler(adminController.deleteContactMessage));

module.exports = router;
