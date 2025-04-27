import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="product-card">
      <div class="wishlist-btn" [class.active]="isInWishlist" (click)="toggleWishlist($event)">
        <i class="fas fa-heart" *ngIf="isInWishlist"></i>
        <i class="far fa-heart" *ngIf="!isInWishlist"></i>
      </div>
      
      <a [routerLink]="['/product', product.id]" class="product-image">
        <img [src]="product.image" [alt]="product.name">
      </a>
      
      <div class="product-content">
        <h3 class="product-title">
          <a [routerLink]="['/product', product.id]">{{ product.name }}</a>
        </h3>
        
        <div class="product-price">
          <span class="current-price">₹{{ product.price.toFixed(2) }}</span>
          <span class="original-price" *ngIf="product.originalPrice">₹{{ product.originalPrice.toFixed(2) }}</span>
        </div>
        
        <button class="add-to-cart-btn" (click)="addToCart()">
          ADD TO CART
        </button>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      background-color: var(--white);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow);
      transition: var(--transition);
      position: relative;
    }
    
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .wishlist-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 36px;
      height: 36px;
      background-color: var(--white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      transition: var(--transition);
    }
    
    .wishlist-btn:hover {
      background-color: var(--primary-color);
      color: var(--white);
    }
    
    .wishlist-btn.active {
      background-color: var(--primary-color);
      color: var(--white);
    }
    
    .product-image {
      display: block;
      height: 250px;
      overflow: hidden;
    }
    
    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .product-card:hover .product-image img {
      transform: scale(1.05);
    }
    
    .product-content {
      padding: 20px;
    }
    
    .product-title {
      margin-bottom: 10px;
      font-size: 18px;
    }
    
    .product-title a {
      color: var(--text-color);
      transition: var(--transition);
    }
    
    .product-title a:hover {
      color: var(--primary-color);
    }
    
    .product-price {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .current-price {
      font-weight: 600;
      font-size: 18px;
      color: var(--primary-color);
    }
    
    .original-price {
      margin-left: 10px;
      font-size: 14px;
      color: #999;
      text-decoration: line-through;
    }
    
    .add-to-cart-btn {
      display: block;
      width: 100%;
      padding: 10px;
      background-color: var(--primary-color);
      color: var(--white);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: var(--transition);
    }
    
    .add-to-cart-btn:hover {
      background-color: #A64CA6;
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;
  isInWishlist = false;
  
  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}
  
  ngOnInit(): void {
    this.checkWishlistStatus();
    
    this.wishlistService.wishlistItems$.subscribe(() => {
      this.checkWishlistStatus();
    });
  }
  
  checkWishlistStatus(): void {
    this.isInWishlist = this.wishlistService.isInWishlist(this.product.id);
  }
  
  toggleWishlist(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.isInWishlist) {
      this.wishlistService.removeFromWishlist(this.product.id);
    } else {
      this.wishlistService.addToWishlist({
        productId: this.product.id,
        name: this.product.name,
        price: this.product.price,
        image: this.product.image
      });
    }
  }
  
  addToCart(): void {
    const defaultSize = this.product.sizeOptions.find(option => option.isDefault)?.value 
      || this.product.sizeOptions[0].value;
      
    this.cartService.addToCart({
      productId: this.product.id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.image,
      quantity: 1,
      size: defaultSize
    });
  }
}