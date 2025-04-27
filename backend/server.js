const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const axios = require('axios');

// Create app
const app = express();
app.use(cors());
app.use(express.json());

// PhonePe Sandbox Integration
app.post('/api/verify-payment', async (req, res) => {
    const merchantId = 'PGTESTPAYUAT'; // Your merchant ID
    const saltKey = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399'; // Your salt key
    const saltIndex = '1';
    const transactionId = req.body.transactionId;
    const baseUrl = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`;
  
    const stringToHash = `/pg/v1/status/${merchantId}/${transactionId}` + saltKey;
    const xVerify = crypto.createHash('sha256').update(stringToHash).digest('hex') + '###' + saltIndex;
  
    try {
      const response = await axios.get(baseUrl, {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': xVerify,
          'X-MERCHANT-ID': merchantId
        }
      });
  
      res.json(response.data);
    } catch (error) {
      console.error('PhonePe status error:', error.response?.data || error.message);
      res.status(500).send('Payment status check failed');
    }
  });
  

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
