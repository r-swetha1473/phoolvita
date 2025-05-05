// routes/paymentRoutes.js

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to initiate a new payment
router.post('/payment', paymentController.initiatePayment);

// Route to receive PhonePe callback (POST callback URL)
router.post('/callback', paymentController.handlePaymentCallback);

// Route to check payment status (called from frontend)
router.get('/status/:transactionId', paymentController.checkPaymentStatus);

// Test route
router.get('/ping', paymentController.getStatus);

module.exports = router;
