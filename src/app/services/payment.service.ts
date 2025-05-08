import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'https://fitbyte-backend-921210989391.us-central1.run.app/api/payment'; // Backend URL

  constructor(private http: HttpClient) {}

  initiatePhonePePayment(orderData: {
    price: number;
    user_id: string;
    phone: string;
    name: string;
    email: string;
    tempId: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/payment`, orderData);
  }
  

  verifyPaymentStatus(merchantTransactionId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/status/${merchantTransactionId}`, {});
  }

  processCashOnDelivery(orderData: {
    billingDetails: {
      firstName: string;
      lastName: string;
      companyName: string;
      country: string;
      streetAddress: string;
      apartment: string;
      city: string;
      state: string;
      zipCode: string;
      phone: string;
      email: string;
    };
    items: CartItem[];
    total: number;
    paymentMethod: string;
  }): Observable<any> {
    return of({
      success: true,
      orderNumber: `ORD${Math.floor(1000 + Math.random() * 9000)}`,
      message: 'Your cash on delivery order has been placed successfully.'
    });
  }
}


// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PaymentService {
//   constructor() {}
  
//   // PhonePe integration simulation
//   initiatePhonePePayment(amount: number, orderId: string): Observable<any> {
//     // In a real implementation, this would make a server call to generate payment link
//     return of({
//       success: true,
//       paymentUrl: `https://phonepe.com/pay/dummy?amount=${amount}&orderId=${orderId}`,
//       merchantTransactionId: `TXN_${Date.now()}`
//     });
//   }
  
//   // Verify payment status
//   verifyPaymentStatus(transactionId: string): Observable<any> {
//     // In a real implementation, this would make a server call to check payment status
//     return of({
//       status: 'SUCCESS',
//       transactionId: transactionId,
//       amount: 480.00
//     });
//   }
  
//   // Process cash on delivery
//   processCashOnDelivery(orderData: any): Observable<any> {
//     return of({
//       success: true,
//       orderNumber: `ORD${Math.floor(Math.random() * 10000)}`,
//       message: 'Your cash on delivery order has been placed successfully.'
//     });
//   }
// }
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PaymentService {

//   constructor(private http: HttpClient) {}


//   initiatePhonePePayment(amount: number, orderId: string): Observable<any> {
//     const payload = { amount, orderId };
//     return this.http.post('http://localhost:4200/api/initiate-payment', payload);
//   }

  
//   verifyPaymentStatus(transactionId: string): Observable<any> {
//     return this.http.post('http://localhost:4200/api/verify-payment', { transactionId });
//   }
//   processCashOnDelivery(orderData: any): Observable<any> {
//     return this.http.post('/api/cash-on-delivery', orderData);
//   }
// }
