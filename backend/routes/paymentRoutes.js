const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Routes
router.post('/payment', paymentController.initiatePayment); // For initiating payment
router.get('/status', paymentController.getStatus);
module.exports = router;
