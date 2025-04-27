import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProductCardComponent],
  template: `
    <div class="container" *ngIf="product">
      <div class="breadcrumb">
        <a routerLink="/">Home</a> / 
        <a routerLink="/shop">Shop</a> / 
        <span>{{ product.name }}</span>
      </div>
      
      <div class="product-details">
        <div class="product-gallery">
          <div class="main-image">
            <img [src]="selectedImage" [alt]="product.name">
          </div>
          
          <div class="thumbnails">
            <div 
              *ngFor="let image of product.thumbnails"
              class="thumbnail"
              [class.active]="selectedImage === image"
              (click)="selectedImage = image"
            >
              <img [src]="image" [alt]="product.name">
            </div>
          </div>
        </div>
        
        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>
          
          <div class="product-meta">
            <div class="sku">SKU: <span>{{ product.id }}</span></div>
          </div>
          
          <div class="product-price">
            <span class="current-price">₹{{ product.price.toFixed(2) }}</span>
            <span class="original-price" *ngIf="product.originalPrice">₹{{ product.originalPrice.toFixed(2) }}</span>
          </div>
          
          <div class="product-options">
            <div class="sizes">
              <p class="option-label">QUANTITY {{ selectedSize }}</p>
              <div class="size-options">
                <label 
                  *ngFor="let size of product.sizeOptions"
                  class="size-option"
                  [class.active]="selectedSize === size.value"
                >
                  <input 
                    type="radio" 
                    name="size" 
                    [value]="size.value"
                    [(ngModel)]="selectedSize"
                  >
                  <span>{{ size.label }}</span>
                </label>
              </div>
            </div>
          </div>
          
          <div class="add-to-cart">
            <div class="quantity">
              <button class="quantity-btn" (click)="decreaseQuantity()">-</button>
              <input type="number" min="1" [(ngModel)]="quantity">
              <button class="quantity-btn" (click)="increaseQuantity()">+</button>
            </div>
            
            <button class="cart-btn" (click)="addToCart()">ADD TO CART</button>
            
            <button 
              class="wishlist-btn" 
              [class.active]="isInWishlist"
              (click)="toggleWishlist()"
            >
              <i class="fas fa-heart" *ngIf="isInWishlist"></i>
              <i class="far fa-heart" *ngIf="!isInWishlist"></i>
            </button>
          </div>
          
          <div class="product-tags" *ngIf="product.tags && product.tags.length > 0">
            <p>TAGS:</p>
            <div class="tag-list">
              <span *ngFor="let tag of product.tags" class="tag">{{ tag }}</span>
            </div>
          </div>
          
          <div class="product-description">
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>
      
      <div class="related-products" *ngIf="relatedProducts.length > 0">
        <h2>More from Ferme Shop</h2>
        <div class="products-grid">
          <div *ngFor="let relatedProduct of relatedProducts">
            <app-product-card [product]="relatedProduct"></app-product-card>
          </div>
        </div>
      </div>
    </div>
    
    <div class="loading" *ngIf="!product">
      <p>Loading product details...</p>
    </div>
  `,
  styles: [`
    .breadcrumb {
      margin-bottom: 20px;
      padding: 10px 0;
      color: #666;
    }
    
    .breadcrumb a {
      color: #666;
      transition: var(--transition);
    }
    
    .breadcrumb a:hover {
      color: var(--primary-color);
    }
    
    .product-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 60px;
    }
    
    .product-gallery {
      position: relative;
    }
    
    .main-image {
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 20px;
      box-shadow: var(--shadow);
    }
    
    .main-image img {
      width: 100%;
      height: auto;
      display: block;
    }
    
    .thumbnails {
      display: flex;
      gap: 10px;
    }
    
    .thumbnail {
      width: 80px;
      height: 80px;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      border: 2px solid transparent;
      transition: var(--transition);
    }
    
    .thumbnail.active,
    .thumbnail:hover {
      border-color: var(--primary-color);
    }
    
    .thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .product-title {
      font-size: 36px;
      color: var(--primary-color);
      margin-bottom: 10px;
    }
    
    .product-meta {
      margin-bottom: .20px;
      font-size: 14px;
      color: #666;
    }
    
    .product-price {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .current-price {
      font-size: 28px;
      font-weight: 600;
      color: var(--primary-color);
    }
    
    .original-price {
      margin-left: 15px;
      font-size: 18px;
      color: #999;
      text-decoration: line-through;
    }
    
    .product-options {
      margin-bottom: 30px;
    }
    
    .option-label {
      font-weight: 500;
      margin-bottom: 10px;
    }
    
    .size-options {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .size-option {
      position: relative;
      cursor: pointer;
    }
    
    .size-option input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }
    
    .size-option span {
      display: block;
      padding: 8px 20px;
      background-color: #f5f5f5;
      border-radius: 4px;
      transition: var(--transition);
      text-align: center;
    }
    
    .size-option input:checked + span,
    .size-option:hover span {
      background-color: var(--primary-color);
      color: var(--white);
    }
    
    .add-to-cart {
      display: flex;
      gap: 15px;
      margin-bottom: 30px;
    }
    
    .quantity {
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .quantity input {
      width: 50px;
      text-align: center;
      border: none;
      appearance: none;
      -moz-appearance: textfield;
    }
    
    .quantity input::-webkit-outer-spin-button,
    .quantity input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    .quantity-btn {
      width: 36px;
      height: 36px;
      background: none;
      border: none;
      font-size: 16px;
      cursor: pointer;
      transition: var(--transition);
    }
    
    .quantity-btn:hover {
      background-color: #f5f5f5;
    }
    
    .cart-btn {
      padding: 0 30px;
      background-color: var(--primary-color);
      color: var(--white);
      border: none;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
    }
    
    .cart-btn:hover {
      background-color: #A64CA6;
    }
    
    .wishlist-btn {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      transition: var(--transition);
    }
    
    .wishlist-btn:hover,
    .wishlist-btn.active {
      background-color: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--white);
    }
    
    .product-tags {
      margin-bottom: 20px;
    }
    
    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 5px;
    }
    
    .tag {
      background-color: #f5f5f5;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 12px;
    }
    
    .product-description {
      line-height: 1.6;
      color: #666;
    }
    
    .related-products {
      margin-bottom: 60px;
    }
    
    .related-products h2 {
      margin-bottom: 30px;
      text-align: center;
    }
    
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 30px;
    }
    
    .loading {
      text-align: center;
      padding: 60px 0;
    }
    
    @media (max-width: 991px) {
      .product-details {
        grid-template-columns: 1fr;
      }
    }
    
    @media (max-width: 576px) {
      .add-to-cart {
        flex-wrap: wrap;
      }
      
      .cart-btn {
        width: 100%;
        padding: 12px;
      }
    }
  `]
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  relatedProducts: Product[] = [];
  selectedImage: string = '';
  selectedSize: string = '';
  quantity: number = 1;
  isInWishlist: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.loadProduct(productId);
    });
  }
  
  loadProduct(id: string): void {
    this.productService.getProductById(id).subscribe(product => {
      if (product) {
        this.product = product;
        this.selectedImage = product.thumbnails[0];
        this.selectedSize = product.sizeOptions.find(option => option.isDefault)?.value || product.sizeOptions[0].value;
        this.checkWishlistStatus();
        this.loadRelatedProducts();
      }
    });
  }
  
  loadRelatedProducts(): void {
    if (this.product) {
      this.productService.getProducts().subscribe(products => {
        this.relatedProducts = products
          .filter(p => p.id !== this.product?.id)
          .filter(p => p.category === this.product?.category)
          .slice(0, 3);
      });
    }
  }
  
  checkWishlistStatus(): void {
    if (this.product) {
      this.isInWishlist = this.wishlistService.isInWishlist(this.product.id);
    }
  }
  
  toggleWishlist(): void {
    if (!this.product) return;
    
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
    
    this.checkWishlistStatus();
  }
  
  increaseQuantity(): void {
    this.quantity++;
  }
  
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  
  addToCart(): void {
    if (!this.product) return;
    
    this.cartService.addToCart({
      productId: this.product.id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.image,
      quantity: this.quantity,
      size: this.selectedSize
    });
  }
}