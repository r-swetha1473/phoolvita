const axios = require('axios');
const CryptoJS = require('crypto-js');
const Order = require('../models/Order');
const { generatedTranscId } = require('../utils/generateTranscId');
const config = require('../config/config');

const retryRequest = async (requestData, retries = 3, delay = 1000) => {
    try {
        const response = await axios.request(requestData);
        return response;
    } catch (error) {
        if (retries > 0 && error.response && error.response.status === 429) {
            console.log(`Rate limit exceeded. Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return retryRequest(requestData, retries - 1, delay * 2);
        }
        throw error;
    }
};

exports.initiatePayment = async (req, res) => {
    try {
        const { price, user_id, phone, name, email, tempId } = req.body;

        const transactionId = generatedTranscId();

        const data = {
            merchantId: config.phonepe.merchantId,
            merchantTransactionId: transactionId,
            merchantUserId: 'MUID' + user_id,
            name: name,
            amount: price * 100,
            redirectUrl: config.phonepe.redirectUrl,
            redirectMode: "POST",
            mobileNumber: phone,
            paymentInstrument: {
                type: "PAY_PAGE",
            },
        };

        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString("base64");
        const key = config.phonepe.saltKey;
        const keyIndex = config.phonepe.saltIndex;
        const string = payloadMain + "/pg/v1/pay" + key;
        const sha256 = CryptoJS.SHA256(string).toString();
        const checksum = sha256 + "###" + keyIndex;

        const prod_URL = config.phonepe.apiBaseUrl + "/pg/v1/pay";
        const requestData = {
            method: "POST",
            url: prod_URL,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
            },
            data: {
                request: payloadMain,
            },
        };

        const response = await retryRequest(requestData);
        const phonePeTransactionId = response.data.transactionId;

        console.log(`Payment initiated for transactionId: ${transactionId}`);

        res.status(201).send({
            msg: "Payment initiated",
            status: "success",
            data: response.data,
            phonePeTransactionId: phonePeTransactionId,
        });

    } catch (error) {
        console.error("Payment API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ msg: "Payment Failed", status: "error", error: error.message });
    }
};

exports.handlePaymentCallback = async (req, res) => {
    try {
        const callbackData = req.body;
        console.log("Received payment callback:", callbackData);

        // TODO: Verify callback signature if required by PhonePe API

        // Process the callback data, e.g., update order status in DB
        const { merchantTransactionId, transactionId, status, responseCode, responseMessage } = callbackData;

        // Example: Update order status in DB (assuming Order model has update logic)
        if (merchantTransactionId) {
            await Order.updateOne(
                { transactionId: merchantTransactionId },
                { $set: { phonePeTransactionId: transactionId, status: status, responseCode: responseCode, responseMessage: responseMessage } }
            );
            console.log(`Order updated for merchantTransactionId: ${merchantTransactionId} with status: ${status}`);
        }

        res.status(200).send({ status: "success" });
    } catch (error) {
        console.error("Payment callback error:", error);
        res.status(500).send({ status: "error", message: error.message });
    }
};

exports.checkPaymentStatus = async (req, res) => {
    try {
        const { transactionId } = req.params;
        if (!transactionId) {
            return res.status(400).json({ msg: "Transaction ID is required", status: "error" });
        }

        const key = config.phonepe.saltKey;
        const keyIndex = config.phonepe.saltIndex;
        const path = `/pg/v1/status/${transactionId}`;
        const string = path + key;
        const sha256 = CryptoJS.SHA256(string).toString();
        const checksum = sha256 + "###" + keyIndex;

        const url = config.phonepe.apiBaseUrl + path;
        const requestData = {
            method: "GET",
            url: url,
            headers: {
                accept: "application/json",
                "X-VERIFY": checksum,
            },
        };

        const response = await retryRequest(requestData);

        console.log(`Payment status checked for transactionId: ${transactionId}`);

        res.status(200).json({ status: "success", data: response.data });
    } catch (error) {
        console.error("Payment status check error:", error.response ? error.response.data : error.message);
        res.status(500).json({ msg: "Failed to check payment status", status: "error", error: error.message });
    }
};

exports.getStatus = (req, res) => {
    res.send("Payment status working");
};
