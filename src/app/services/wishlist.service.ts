import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WishlistItem } from '../models/wishlist-item.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly WISHLIST_STORAGE_KEY = 'wishlist_items';
  
  private wishlistItemsSubject = new BehaviorSubject<WishlistItem[]>(this.getWishlistFromStorage());
  wishlistItems$ = this.wishlistItemsSubject.asObservable();
  
  constructor() {}
  
  getWishlistFromStorage(): WishlistItem[] {
    const wishlistData = localStorage.getItem(this.WISHLIST_STORAGE_KEY);
    return wishlistData ? JSON.parse(wishlistData) : [];
  }
  
  updateStorage(items: WishlistItem[]): void {
    localStorage.setItem(this.WISHLIST_STORAGE_KEY, JSON.stringify(items));
    this.wishlistItemsSubject.next(items);
  }
  
  addToWishlist(item: WishlistItem): void {
    const currentWishlist = this.getWishlistFromStorage();
    const existingItemIndex = currentWishlist.findIndex(
      wishlistItem => wishlistItem.productId === item.productId
    );
    
    if (existingItemIndex === -1) {
      currentWishlist.push(item);
      this.updateStorage(currentWishlist);
    }
  }
  
  removeFromWishlist(productId: string): void {
    const currentWishlist = this.getWishlistFromStorage();
    const updatedWishlist = currentWishlist.filter(item => item.productId !== productId);
    this.updateStorage(updatedWishlist);
  }
  
  isInWishlist(productId: string): boolean {
    const currentWishlist = this.getWishlistFromStorage();
    return currentWishlist.some(item => item.productId === productId);
  }
  
  clearWishlist(): void {
    localStorage.removeItem(this.WISHLIST_STORAGE_KEY);
    this.wishlistItemsSubject.next([]);
  }
}