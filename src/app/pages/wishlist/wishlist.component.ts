import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { WishlistItem } from '../../models/wishlist-item.model';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="wishlist-page">
        <h1>My Wishlist</h1>
        
        <div class="wishlist-content" *ngIf="wishlistItems.length > 0; else emptyWishlist">
          <table class="wishlist-table">
            <thead>
              <tr>
                <th class="product-remove"></th>
                <th class="product-thumbnail"></th>
                <th class="product-name">Product</th>
                <th class="product-price">Price</th>
                <th class="product-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of wishlistItems">
                <td class="product-remove">
                  <button (click)="removeFromWishlist(item.productId)" class="remove-btn">
                    <i class="fas fa-times"></i>
                  </button>
                </td>
                <td class="product-thumbnail">
                  <a [routerLink]="['/product', item.productId]">
                    <img [src]="item.image" [alt]="item.name">
                  </a>
                </td>
                <td class="product-name">
                  <a [routerLink]="['/product', item.productId]">{{ item.name }}</a>
                </td>
                <td class="product-price">
                  <span>₹{{ item.price.toFixed(2) }}</span>
                </td>
                <td class="product-actions">
                  <button (click)="addToCart(item)" class="add-to-cart-btn">
                    ADD TO CART
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <ng-template #emptyWishlist>
          <div class="empty-wishlist">
            <i class="far fa-heart"></i>
            <h2>Your wishlist is empty</h2>
            <p>Add items you love to your wishlist. Review them anytime and easily move them to the cart.</p>
            <a routerLink="/shop" class="btn btn-primary">Browse Products</a>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .wishlist-page {
      margin-bottom: 60px;
    }
    
    .wishlist-page h1 {
      margin-bottom: 30px;
      font-size: 28px;
    }
    
    .wishlist-table {
      width: 100%;
      border-collapse: collapse;
      background-color: var(--white);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow);
    }
    
    .wishlist-table th,
    .wishlist-table td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    
    .wishlist-table th {
      background-color: #f9f9f9;
      font-weight: 500;
    }
    
    .product-remove {
      width: 50px;
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
    
    .product-thumbnail {
      width: 100px;
    }
    
    .product-thumbnail img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
    }
    
    .product-name a {
      color: var(--text-color);
      font-weight: 500;
      transition: var(--transition);
    }
    
    .product-name a:hover {
      color: var(--primary-color);
    }
    
    .product-price {
      font-weight: 600;
      color: var(--primary-color);
    }
    
    .add-to-cart-btn {
      padding: 8px 15px;
      background-color: var(--primary-color);
      color: var(--white);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: var(--transition);
    }
    
    .add-to-cart-btn:hover {
      background-color: #A64CA6;
    }
    
    .empty-wishlist {
      text-align: center;
      padding: 60px 30px;
      background-color: var(--white);
      border-radius: 8px;
      box-shadow: var(--shadow);
    }
    
    .empty-wishlist i {
      font-size: 50px;
      color: #ddd;
      margin-bottom: 20px;
    }
    
    .empty-wishlist h2 {
      margin-bottom: 10px;
    }
    
    .empty-wishlist p {
      margin-bottom: 20px;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
      color: #666;
    }
    
    .btn-primary {
      display: inline-block;
      padding: 10px 20px;
      background-color: var(--primary-color);
      color: var(--white);
      border-radius: 4px;
      font-weight: 500;
      transition: var(--transition);
    }
    
    .btn-primary:hover {
      background-color: #A64CA6;
    }
    
    @media (max-width: 768px) {
      .wishlist-table thead {
        display: none;
      }
      
      .wishlist-table tbody tr {
        display: flex;
        flex-direction: column;
        padding: 20px;
        border-bottom: 1px solid #eee;
      }
      
      .wishlist-table td {
        padding: 5px 0;
        border-bottom: none;
      }
      
      .product-remove {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      
      .product-thumbnail {
        display: flex;
        justify-content: center;
        width: 100%;
      }
      
      .product-name {
        text-align: center;
        font-size: 18px;
        margin: 10px 0;
      }
      
      .product-price {
        text-align: center;
      }
      
      .product-actions {
        display: flex;
        justify-content: center;
        margin-top: 10px;
      }
    }
  `]
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];
  
  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}
  
  ngOnInit(): void {
    this.wishlistService.wishlistItems$.subscribe(items => {
      this.wishlistItems = items;
    });
  }
  
  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId);
  }
  
  addToCart(item: WishlistItem): void {
    this.cartService.addToCart({
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
    this.wishlistService.removeFromWishlist(item.productId);
  }
}