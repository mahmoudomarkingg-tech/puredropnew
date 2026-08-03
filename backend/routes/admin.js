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

router.get('/hub-summary', asyncHandler(adminController.getAdminHubSummary));
router.get('/customers', asyncHandler(adminController.listSavedCustomers));

router.get('/contact-messages', asyncHandler(adminController.listContactMessages));
router.patch('/contact-messages/:id/status', asyncHandler(adminController.updateContactMessageStatus));
router.post('/contact-messages/:id/status', asyncHandler(adminController.updateContactMessageStatus));
router.delete('/contact-messages/:id', asyncHandler(adminController.deleteContactMessage));
router.post('/contact-messages/:id/delete', asyncHandler(adminController.deleteContactMessage));

const couponsController = require('../controllers/couponsController');
router.get('/coupons', asyncHandler(couponsController.listAdminCouponAccounts));
router.post('/coupons', asyncHandler(couponsController.createAdminCouponAccount));
router.get('/coupons/:id/ledger', asyncHandler(couponsController.getAdminCouponLedger));
router.patch('/coupons/:id/adjust', asyncHandler(couponsController.adjustAdminCouponAccount));
router.post('/coupons/:id/adjust', asyncHandler(couponsController.adjustAdminCouponAccount));
router.patch('/coupons/:id/status', asyncHandler(couponsController.blockAdminCouponAccount));
router.post('/coupons/:id/status', asyncHandler(couponsController.blockAdminCouponAccount));

module.exports = router;
