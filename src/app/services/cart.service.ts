import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'cart_items';
  
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.getCartFromStorage());
  cartItems$ = this.cartItemsSubject.asObservable();
  
  constructor() {}
  
  getCartFromStorage(): CartItem[] {
    const cartData = localStorage.getItem(this.CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  }
  
  updateStorage(items: CartItem[]): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(items));
    this.cartItemsSubject.next(items);
  }
  
  addToCart(item: CartItem): void {
    const currentCart = this.getCartFromStorage();
    const existingItemIndex = currentCart.findIndex(
      cartItem => cartItem.productId === item.productId && cartItem.size === item.size
    );
    
    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += item.quantity;
    } else {
      currentCart.push(item);
    }
    
    this.updateStorage(currentCart);
  }
  
  removeFromCart(productId: string, size?: string): void {
    let currentCart = this.getCartFromStorage();
    
    if (size) {
      currentCart = currentCart.filter(item => !(item.productId === productId && item.size === size));
    } else {
      currentCart = currentCart.filter(item => item.productId !== productId);
    }
    
    this.updateStorage(currentCart);
  }
  
  updateQuantity(productId: string, quantity: number, size?: string): void {
    const currentCart = this.getCartFromStorage();
    const itemIndex = currentCart.findIndex(
      item => item.productId === productId && (!size || item.size === size)
    );
    
    if (itemIndex > -1) {
      currentCart[itemIndex].quantity = quantity;
      this.updateStorage(currentCart);
    }
  }
  
  clearCart(): void {
    localStorage.removeItem(this.CART_STORAGE_KEY);
    this.cartItemsSubject.next([]);
  }
  
  getCartTotal(): number {
    const currentCart = this.getCartFromStorage();
    return currentCart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  getCartItemCount(): number {
    return this.getCartFromStorage().length;
  }
}