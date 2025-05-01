export const environment = {
  production: false,
  phonepe: {
    apiBaseUrl: 'https://api-preprod.phonepe.com/apis/pg-sandbox',
    merchantId: 'PGTESTPAYUAT',
    saltKey: 'a6334ff7-da0e-4d51-a9ce-76b97d518b1e', // Updated with actual salt key
    saltIndex: '1',
    redirectUrl: 'http://localhost:4200/payment/status',
    callbackUrl: 'http://localhost:4200/payment/callback'
  }
};
