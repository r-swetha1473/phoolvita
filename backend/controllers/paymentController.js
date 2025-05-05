const axios = require('axios');
const CryptoJS = require('crypto-js');
const Order = require('../models/Order');
const { generatedTranscId } = require('../utils/generateTranscId');
const config = require('../config/config');

// Retry on rate limit
const retryRequest = async (requestData, retries = 3, delay = 1000) => {
    try {
        return await axios.request(requestData);
    } catch (error) {
        if (retries > 0 && error.response?.status === 429) {
            console.log(`Rate limited. Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return retryRequest(requestData, retries - 1, delay * 2);
        }
        throw error;
    }
};

exports.initiatePayment = async (req, res) => {
    try {
        const { price, user_id, phone, name, email, tempId } = req.body;

        const existingOrder = Order.getOrderByTempId(tempId);
        if (existingOrder) {
            return res.status(429).json({ msg: "Payment already in progress. Please wait.", status: "error" });
        }

        const transactionId = generatedTranscId();

        const requestPayload = {
            merchantId: config.phonepe.merchantId,
            merchantTransactionId: transactionId,
            merchantUserId: 'MUID' + user_id,
            name,
            amount: price * 100, // in paise
            redirectUrl: config.phonepe.redirectUrl, // e.g., http://localhost:4200/order-complete
            redirectMode: "POST",
            mobileNumber: phone,
            paymentInstrument: {
                type: "PAY_PAGE",
            },
            
        };

        const payloadString = JSON.stringify(requestPayload);
        const payloadEncoded = Buffer.from(payloadString).toString("base64");

        const path = "/pg/v1/pay";
        const stringToHash = payloadEncoded + path + config.phonepe.saltKey;
        const sha256 = CryptoJS.SHA256(stringToHash).toString();
        const checksum = `${sha256}###${config.phonepe.saltIndex}`;

        const url = config.phonepe.apiBaseUrl + path;

        const requestData = {
            method: "POST",
            url,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
            },
            data: {
                request: payloadEncoded,
            },
        };

        console.log("📤 Sending Payment Request to PhonePe:", requestData);

        const response = await retryRequest(requestData);
        const redirectUrl = response.data?.data?.instrumentResponse?.redirectInfo?.url;

        if (!redirectUrl) {
            throw new Error("PhonePe did not return a redirect URL.");
        }

        Order.addOrder({
            transactionId,
            tempId,
            userId: user_id,
            amount: price,
            phonePeTransactionId: response.data.transactionId,
            paymentStatus: "initiated",
        });

        console.log(`✅ PhonePe Payment initiated: ${transactionId}`);

        // ⚠️ Don't redirect here. Send the URL to frontend
        res.status(201).json({
            msg: "Payment initiated successfully",
            status: "success",
            transactionId,
            phonePeTransactionId: response.data.transactionId,
            redirectUrl, // 👈 Frontend must redirect to this
        });

    } catch (error) {
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.error || error.message || "Unknown error";
        console.error("❌ initiatePayment error:", errorMessage);

        res.status(statusCode).json({
            msg: "Payment initiation failed",
            status: "error",
            error: errorMessage,
        });
    }
};

// ✅ PhonePe Redirect Callback Handler
exports.handlePaymentCallback = async (req, res) => {
    try {
        const callbackData = req.body;
        console.log("📥 Payment callback data:", callbackData);

        const { merchantTransactionId, transactionId, status } = callbackData;

        if (merchantTransactionId) {
            Order.updateOrderStatus(merchantTransactionId, status);
            console.log(`ℹ️ Order updated: ${merchantTransactionId} => ${status}`);
        }

        res.status(200).send({ status: "success" });
    } catch (error) {
        console.error("❌ handlePaymentCallback error:", error.message);
        res.status(500).send({ status: "error", message: error.message });
    }
};

// ✅ Status checker
exports.checkPaymentStatus = async (req, res) => {
    try {
        const { transactionId } = req.params;
        if (!transactionId) {
            return res.status(400).json({ msg: "Transaction ID is required", status: "error" });
        }

        const path = `/pg/v1/status/${transactionId}`;
        const hashString = path + config.phonepe.saltKey;
        const sha256 = CryptoJS.SHA256(hashString).toString();
        const checksum = `${sha256}###${config.phonepe.saltIndex}`;

        const url = config.phonepe.apiBaseUrl + path;
        const requestData = {
            method: "GET",
            url,
            headers: {
                accept: "application/json",
                "X-VERIFY": checksum,
            },
        };

        const response = await retryRequest(requestData);
        res.status(200).json({ status: "success", data: response.data });

    } catch (error) {
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.error || error.message;
        console.error("❌ checkPaymentStatus error:", errorMessage);

        res.status(statusCode).json({
            msg: "Failed to check payment status",
            status: "error",
            error: errorMessage,
        });
    }
};

exports.getStatus = (req, res) => {
    res.send("Payment status route OK");
};
