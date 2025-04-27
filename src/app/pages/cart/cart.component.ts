import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="checkout-steps">
      <div class="container">
        <div class="steps">
          <div class="step active">CART</div>
          <div class="step">CHECKOUT</div>
          <div class="step">ORDER COMPLETE</div>
        </div>
      </div>
    </div>
    
    <div class="container">
      <div class="cart-page" *ngIf="cartItems.length > 0; else emptyCart">
        <div class="cart-heading">
          <h1>Your cart ({{ cartItems.length }} item<span *ngIf="cartItems.length > 1">s</span>)</h1>
        </div>
        
        <div class="cart-content">
          <div class="cart-items">
            <div class="cart-item" *ngFor="let item of cartItems">
              <div class="item-image">
                <img [src]="item.image" [alt]="item.name">
              </div>
              
              <div class="item-details">
                <h3>{{ item.name }} <span *ngIf="item.size">- {{ item.size }}</span></h3>
                
                <div class="item-quantity">
                  <input 
                    type="number" 
                    min="1" 
                    [value]="item.quantity"
                    (change)="updateQuantity(item.productId, $event, item.size)"
                  >
                </div>
              </div>
              
              <div class="item-price">
                ₹{{ (item.price * item.quantity).toFixed(2) }}
              </div>
              
              <button class="remove-btn" (click)="removeItem(item.productId, item.size)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          
          <div class="cart-summary">
            <h2>Cart totals</h2>
            
            <div class="summary-row">
              <span>Subtotal</span>
              <span>₹{{ cartTotal.toFixed(2) }}</span>
            </div>
            
            <div class="summary-row">
              <span>TOTAL</span>
              <span>₹{{ cartTotal.toFixed(2) }}</span>
            </div>
            
            <a routerLink="/checkout" class="checkout-btn">PROCEED TO CHECKOUT</a>
            
            <div class="voucher-section">
              <details>
                <summary>Add a voucher (Optional)</summary>
                <div class="voucher-form">
                  <input type="text" placeholder="Enter voucher code">
                  <button>Apply</button>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
      
      <ng-template #emptyCart>
        <div class="empty-cart">
          <i class="fas fa-shopping-cart"></i>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <a routerLink="/shop" class="btn btn-primary">Continue Shopping</a>
        </div>
      </ng-template>
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
    
    .cart-page {
      margin-bottom: 60px;
    }
    
    .cart-heading h1 {
      margin-bottom: 30px;
      font-size: 28px;
    }
    
    .cart-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 30px;
    }
    
    .cart-items {
      background-color: var(--white);
      border-radius: 8px;
      box-shadow: var(--shadow);
      padding: 20px;
    }
    
    .cart-item {
      display: flex;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid #eee;
    }
    
    .cart-item:last-child {
      border-bottom: none;
    }
    
    .item-image {
      width: 80px;
      height: 80px;
      margin-right: 20px;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .item-details {
      flex: 1;
    }
    
    .item-details h3 {
      margin-bottom: 10px;
      font-size: 16px;
    }
    
    .item-quantity input {
      width: 60px;
      padding: 5px;
      border: 1px solid #ddd;
      border-radius: 4px;
      text-align: center;
    }
    
    .item-price {
      font-weight: 600;
      color: var(--primary-color);
      margin: 0 20px;
    }
    
    .remove-btn {
      background: none;
      border: none;
      color: #999;
      cursor: pointer;
      transition: var(--transition);
    }
    
    .remove-btn:hover {
      color: var(--danger);
    }
    
    .cart-summary {
      background-color: var(--white);
      border-radius: 8px;
      box-shadow: var(--shadow);
      padding: 20px;
      align-self: start;
    }
    
    .cart-summary h2 {
      margin-bottom: 20px;
      font-size: 22px;
    }
    
    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 15px 0;
      border-bottom: 1px solid #eee;
    }
    
    .summary-row:last-of-type {
      font-weight: 600;
      font-size: 18px;
      color: var(--primary-color);
      border-bottom: none;
      margin-bottom: 20px;
    }
    
    .checkout-btn {
      display: block;
      width: 100%;
      padding: 12px;
      background-color: var(--primary-color);
      color: var(--white);
      border: none;
      border-radius: 4px;
      text-align: center;
      font-weight: 500;
      margin-bottom: 20px;
      transition: var(--transition);
    }
    
    .checkout-btn:hover {
      background-color: #A64CA6;
    }
    
    .voucher-section {
      margin-top: 20px;
    }
    
    .voucher-section summary {
      cursor: pointer;
      padding: 10px 0;
      user-select: none;
    }
    
    .voucher-form {
      display: flex;
      margin-top: 10px;
    }
    
    .voucher-form input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px 0 0 4px;
    }
    
    .voucher-form button {
      padding: 8px 15px;
      background-color: var(--primary-color);
      color: var(--white);
      border: none;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
    }
    
    .empty-cart {
      text-align: center;
      padding: 60px 0;
      background-color: var(--white);
      border-radius: 8px;
      box-shadow: var(--shadow);
      margin-bottom: 60px;
    }
    
    .empty-cart i {
      font-size: 50px;
      color: #ddd;
      margin-bottom: 20px;
    }
    
    .empty-cart h2 {
      margin-bottom: 10px;
    }
    
    .empty-cart p {
      margin-bottom: 20px;
      color: #666;
    }
    
    @media (max-width: 991px) {
      .cart-content {
        grid-template-columns: 1fr;
      }
    }
    
    @media (max-width: 576px) {
      .cart-item {
        flex-wrap: wrap;
      }
      
      .item-details {
        width: 100%;
        margin: 10px 0;
      }
      
      .item-price {
        margin-left: 0;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  
  constructor(private cartService: CartService) {}
  
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
  
  updateQuantity(productId: string, event: any, size?: string): void {
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity, size);
    }
  }
  
  removeItem(productId: string, size?: string): void {
    this.cartService.removeFromCart(productId, size);
  }
}