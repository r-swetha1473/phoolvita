import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-complete',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="checkout-steps">
      <div class="container">
        <div class="steps">
          <div class="step">CART</div>
          <div class="step">CHECKOUT</div>
          <div class="step active">ORDER COMPLETE</div>
        </div>
      </div>
    </div>
    
    <div class="container">
      <div class="order-complete">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        
        <h1>Thank you. Your order has been received.</h1>
        
        <div class="order-info">
          <div class="info-box">
            <span class="label">Order number:</span>
            <span class="value">{{ orderData?.orderNumber || 'ORD1234' }}</span>
          </div>
          
          <div class="info-box">
            <span class="label">Date:</span>
            <span class="value">{{ currentDate | date:'mediumDate' }}</span>
          </div>
          
          <div class="info-box">
            <span class="label">Total:</span>
            <span class="value">₹{{ orderData?.total.toFixed(2) || '0.00' }}</span>
          </div>
          
          <div class="info-box">
            <span class="label">Payment method:</span>
            <span class="value">{{ paymentMethodLabel }}</span>
          </div>
        </div>
        
        <div class="order-details" *ngIf="orderData">
          <h2>Order details</h2>
          
          <table class="order-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of orderData.items">
                <td>{{ item.name }} - {{ item.size }} × {{ item.quantity }}</td>
                <td>₹{{ (item.price * item.quantity).toFixed(2) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Subtotal:</th>
                <td>₹{{ orderData.total.toFixed(2) }}</td>
              </tr>
              <tr>
                <th>Payment method:</th>
                <td>{{ paymentMethodLabel }}</td>
              </tr>
              <tr>
                <th>Total:</th>
                <td>₹{{ orderData.total.toFixed(2) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div class="customer-details" *ngIf="orderData">
          <h2>Customer details</h2>
          
          <table class="customer-table">
            <tr>
              <th>Billing address</th>
              <td>
                {{ orderData.billingDetails.firstName }} {{ orderData.billingDetails.lastName }}<br>
                {{ orderData.billingDetails.streetAddress }}<br>
                <span *ngIf="orderData.billingDetails.apartment" [innerHTML]="orderData.billingDetails.apartment + '<br>'"></span>
               
                {{ orderData.billingDetails.city }}, {{ orderData.billingDetails.state }} {{ orderData.billingDetails.zipCode }}<br>
                {{ orderData.billingDetails.country }}
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{{ orderData.billingDetails.email }}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{{ orderData.billingDetails.phone }}</td>
            </tr>
          </table>
        </div>
        
        <div class="actions">
          <a routerLink="/" class="btn btn-primary">Return to Home</a>
          <a routerLink="/shop" class="btn btn-outline">Continue Shopping</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-steps {
      background-color: var(--white);
      padding: 20px 0;
      margin-bottom: 40px;
      box-shadow: var(--shadow);
    }
    
    .steps {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 600px;
      margin: 0 auto;
      position: relative;
    }
    
    .steps::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #eee;
      z-index: 1;
    }
    
    .step {
      position: relative;
      background-color: var(--white);
      padding: 10px 20px;
      border-radius: 30px;
      font-weight: 500;
      color: #999;
      z-index: 2;
    }
    
    .step.active {
      background-color: var(--primary-color);
      color: var(--white);
    }
    
    .order-complete {
      background-color: var(--white);
      border-radius: 8px;
      padding: 40px;
      box-shadow: var(--shadow);
      margin-bottom: 60px;
      text-align: center;
    }
    
    .success-icon {
      font-size: 60px;
      color: var(--success);
      margin-bottom: 20px;
    }
    
    .order-complete h1 {
      margin-bottom: 30px;
      font-size: 28px;
    }
    
    .order-info {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 30px;
      margin-bottom: 40px;
    }
    
    .info-box {
      display: flex;
      flex-direction: column;
    }
    
    .label {
      color: #666;
      margin-bottom: 5px;
    }
    
    .value {
      font-weight: 600;
      font-size: 18px;
      color: var(--primary-color);
    }
    
    .order-details,
    .customer-details {
      margin-bottom: 40px;
      text-align: left;
    }
    
    .order-details h2,
    .customer-details h2 {
      margin-bottom: 20px;
      font-size: 22px;
    }
    
    .order-table,
    .customer-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .order-table th,
    .order-table td,
    .customer-table th,
    .customer-table td {
      padding: 15px;
      border-bottom: 1px solid #eee;
    }
    
    .order-table th,
    .customer-table th {
      text-align: left;
      width: 40%;
    }
    
    .order-table tfoot tr:last-child {
      font-weight: 600;
      color: var(--primary-color);
    }
    
    .actions {
      display: flex;
      justify-content: center;
      gap: 20px;
    }
    
    .btn {
      padding: 12px 25px;
      border-radius: 4px;
      font-weight: 500;
      transition: var(--transition);
      text-align: center;
    }
    
    .btn-primary {
      background-color: var(--primary-color);
      color: var(--white);
    }
    
    .btn-primary:hover {
      background-color: #A64CA6;
    }
    
    .btn-outline {
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
    }
    
    .btn-outline:hover {
      background-color: var(--primary-color);
      color: var(--white);
    }
    
    @media (max-width: 768px) {
      .order-info {
        flex-direction: column;
        align-items: center;
        gap: 15px;
      }
      
      .actions {
        flex-direction: column;
        align-items: center;
      }
      
      .btn {
        width: 100%;
        max-width: 300px;
      }
    }
  `]
})
export class OrderCompleteComponent implements OnInit {
  orderData: any;
  currentDate = new Date();
  paymentMethodLabel = 'Cash on delivery';
  
  ngOnInit(): void {
    const orderDataStr = localStorage.getItem('order_data');
    if (orderDataStr) {
      this.orderData = JSON.parse(orderDataStr);
      this.paymentMethodLabel = this.orderData.paymentMethod === 'phonepe' 
        ? 'PhonePe' 
        : 'Cash on delivery';
    }
  }
}