import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { PaymentService } from '../../services/payment.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="checkout-steps">
      <div class="container">
        <div class="steps">
          <div class="step">CART</div>
          <div class="step active">CHECKOUT</div>
          <div class="step">ORDER COMPLETE</div>
        </div>
      </div>
    </div>
    
    <div class="container">
      <div class="checkout-page">
        <div class="coupon-section">
          <div class="coupon-toggle">
            Have a coupon? Click here to enter your code
          </div>
        </div>
        
        <div class="checkout-content">
          <div class="billing-details">
            <h2>Billing details</h2>
            
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First name *</label>
                <input type="text" id="firstName" [(ngModel)]="billingDetails.firstName" required>
              </div>
              
              <div class="form-group">
                <label for="lastName">Last name *</label>
                <input type="text" id="lastName" [(ngModel)]="billingDetails.lastName" required>
              </div>
            </div>
            
            <div class="form-group">
              <label for="companyName">Company name (optional)</label>
              <input type="text" id="companyName" [(ngModel)]="billingDetails.companyName">
            </div>
            
            <div class="form-group">
              <label for="country">Country / Region *</label>
              <select id="country" [(ngModel)]="billingDetails.country" required>
                <option value="India">India</option>
                <option value="United States (US)">United States (US)</option>
                <option value="United Kingdom (UK)">United Kingdom (UK)</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="streetAddress">Street address *</label>
              <input 
                type="text" 
                id="streetAddress" 
                placeholder="House number and street name" 
                [(ngModel)]="billingDetails.streetAddress" 
                required
              >
            </div>
            
            <div class="form-group">
              <label for="apartment">Apartment, suite, unit, etc. (optional)</label>
              <input 
                type="text" 
                id="apartment" 
                [(ngModel)]="billingDetails.apartment"
              >
            </div>
            
            <div class="form-group">
              <label for="city">Town / City *</label>
              <input type="text" id="city" [(ngModel)]="billingDetails.city" required>
            </div>
            
            <div class="form-group">
              <label for="state">State *</label>
              <select id="state" [(ngModel)]="billingDetails.state" required>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Karnataka">Karnataka</option>
                <option value="California">California</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="zipCode">ZIP Code *</label>
              <input type="text" id="zipCode" [(ngModel)]="billingDetails.zipCode" required>
            </div>
            
            <div class="form-group">
              <label for="phone">Phone *</label>
              <input type="tel" id="phone" [(ngModel)]="billingDetails.phone" required>
            </div>
            
            <div class="form-group">
              <label for="email">Email address *</label>
              <input type="email" id="email" [(ngModel)]="billingDetails.email" required>
            </div>
          </div>
          
          <div class="order-summary">
            <h2>Your order</h2>
            
            <div class="order-items">
              <div class="order-item" *ngFor="let item of cartItems">
                <div class="item-name">
                  {{ item.name }} - {{ item.size }} <span>× {{ item.quantity }}</span>
                </div>
                <div class="item-price">₹{{ (item.price * item.quantity).toFixed(2) }}</div>
              </div>
            </div>
            
            <div class="order-totals">
              <div class="total-row">
                <span>Subtotal</span>
                <span>₹{{ cartTotal.toFixed(2) }}</span>
              </div>
              
              <div class="total-row grand-total">
                <span>TOTAL</span>
                <span>₹{{ cartTotal.toFixed(2) }}</span>
              </div>
            </div>
            
            <div class="payment-methods">
              <div class="payment-method">
                <input 
                  type="radio" 
                  id="phonePe" 
                  name="paymentMethod" 
                  value="phonepe" 
                  [(ngModel)]="selectedPaymentMethod"
                >
                <label for="phonePe">PhonePe</label>
                <div class="method-description" *ngIf="selectedPaymentMethod === 'phonepe'">
                  Pay with PhonePe - India's leading digital payments app.
                </div>
              </div>
              
              <div class="payment-method">
                <input 
                  type="radio" 
                  id="cod" 
                  name="paymentMethod" 
                  value="cod" 
                  [(ngModel)]="selectedPaymentMethod"
                >
                <label for="cod">Cash on delivery</label>
                <div class="method-description" *ngIf="selectedPaymentMethod === 'cod'">
                  Pay with cash upon delivery.
                </div>
              </div>
            </div>
            
            <div class="privacy-notice">
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
            </div>
            
            <div class="terms-check">
              <input type="checkbox" id="termsCheck" [(ngModel)]="termsAccepted">
              <label for="termsCheck">I have read and agree to the website terms and conditions *</label>
            </div>
            
            <button 
              [disabled]="!isFormValid()" 
              class="place-order-btn" 
              [class.disabled]="!isFormValid()"
              (click)="placeOrder()"
            >
              PLACE ORDER
            </button>
          </div>
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
    
    .checkout-page {
      margin-bottom: 60px;
    }
    
    .coupon-section {
      margin-bottom: 20px;
    }
    
    .coupon-toggle {
      padding: 15px;
      background-color: #f9f9f9;
      border-radius: 4px;
      border-left: 3px solid var(--primary-color);
      cursor: pointer;
    }
    
    .checkout-content {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 30px;
    }
    
    .billing-details {
      background-color: var(--white);
      border-radius: 8px;
      padding: 30px;
      box-shadow: var(--shadow);
    }
    
    .billing-details h2 {
      margin-bottom: 20px;
      font-size: 24px;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    
    .form-group input,
    .form-group select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .order-summary {
      background-color: var(--white);
      border-radius: 8px;
      padding: 30px;
      box-shadow: var(--shadow);
      align-self: start;
    }
    
    .order-summary h2 {
      margin-bottom: 20px;
      font-size: 24px;
    }
    
    .order-items {
      margin-bottom: 20px;
    }
    
    .order-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    
    .item-name span {
      color: #666;
    }
    
    .item-price {
      font-weight: 500;
    }
    
    .order-totals {
      margin-bottom: 20px;
    }
    
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    
    .grand-total {
      font-weight: 600;
      font-size: 18px;
      color: var(--primary-color);
    }
    
    .payment-methods {
      margin-bottom: 20px;
    }
    
    .payment-method {
      margin-bottom: 10px;
    }
    
    .payment-method label {
      margin-left: 10px;
      font-weight: 500;
    }
    
    .method-description {
      margin-top: 5px;
      margin-left: 30px;
      font-size: 14px;
      color: #666;
    }
    
    .privacy-notice {
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
    }
    
    .terms-check {
      display: flex;
      align-items: flex-start;
      margin-bottom: 20px;
    }
    
    .terms-check input {
      margin-right: 10px;
      margin-top: 3px;
    }
    
    .place-order-btn {
      display: block;
      width: 100%;
      padding: 15px;
      background-color: var(--primary-color);
      color: var(--white);
      border: none;
      border-radius: 4px;
      font-weight: 500;
      text-align: center;
      cursor: pointer;
      transition: var(--transition);
    }
    
    .place-order-btn:hover:not(.disabled) {
      background-color: #A64CA6;
    }
    
    .place-order-btn.disabled {
      background-color: #ddd;
      color: #999;
      cursor: not-allowed;
    }
    
    @media (max-width: 991px) {
      .checkout-content {
        grid-template-columns: 1fr;
      }
    }
    
    @media (max-width: 576px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  selectedPaymentMethod: string = 'cod';
  termsAccepted: boolean = false;
  
  billingDetails = {
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'India',
    streetAddress: '',
    apartment: '',
    city: '',
    state: 'Maharashtra',
    zipCode: '',
    phone: '',
    email: ''
  };
  
  constructor(
    private cartService: CartService,
    private paymentService: PaymentService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }
  
  calculateTotal(): void {
    this.cartTotal = this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
  
  isFormValid(): boolean {
    return (
      this.billingDetails.firstName.trim() !== '' &&
      this.billingDetails.lastName.trim() !== '' &&
      this.billingDetails.streetAddress.trim() !== '' &&
      this.billingDetails.city.trim() !== '' &&
      this.billingDetails.zipCode.trim() !== '' &&
      this.billingDetails.phone.trim() !== '' &&
      this.billingDetails.email.trim() !== '' &&
      this.termsAccepted
    );
  }
  
  placeOrder(): void {
    if (!this.isFormValid()) return;
    
    const orderData = {
      billingDetails: this.billingDetails,
      items: this.cartItems,
      total: this.cartTotal,
      paymentMethod: this.selectedPaymentMethod,
      price: this.cartTotal, // Adding the total price
      user_id: 'user123', // Replace with actual user ID
      phone: this.billingDetails.phone,
      name: `${this.billingDetails.firstName} ${this.billingDetails.lastName}`,
      email: this.billingDetails.email,
      tempId: `ORD${Math.floor(Math.random() * 10000)}` // Temporary order ID
    };
    
    if (this.selectedPaymentMethod === 'phonepe') {
      // Pass the full order data to initiatePhonePePayment
      this.paymentService.initiatePhonePePayment(orderData).subscribe(response => {
        if (response.status === 'success') {
          // In a real app, redirect to PhonePe payment page
          // For demo, we'll just proceed to order complete
          localStorage.setItem('order_data', JSON.stringify(orderData));
          this.cartService.clearCart();
          this.router.navigate(['/order-complete']);
        } else {
          console.error('Payment initiation failed');
        }
      }, error => {
        console.error('Payment API Error:', error);
      });
    } else {
      // Cash on delivery
      this.paymentService.processCashOnDelivery(orderData).subscribe(response => {
        if (response.success) {
          localStorage.setItem('order_data', JSON.stringify({
            ...orderData,
            orderNumber: response.orderNumber
          }));
          this.cartService.clearCart();
          this.router.navigate(['/order-complete']);
        }
      });
    }
  }
  
}