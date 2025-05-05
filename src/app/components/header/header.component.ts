import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/">
              <img src="assets/images/logo.jpg" alt="PhoolVita Logo" />
              <!-- <span>PhoolVita</span> -->
            </a>
          </div>
          
          <nav class="main-nav">
            <ul>
              <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">HOME</a></li>
              <li><a routerLink="/about-us" routerLinkActive="active">ABOUT US</a></li>
              <li><a routerLink="/shop" routerLinkActive="active">SHOP ONLINE</a></li>
              <li><a routerLink="/contact" routerLinkActive="active">CONTACT US</a></li>
            </ul>
          </nav>
          
          <div class="header-actions">
            <a routerLink="/wishlist" class="icon-btn">
              <i class="far fa-heart"></i>
              <span class="badge" *ngIf="wishlistItemCount > 0">{{ wishlistItemCount }}</span>
            </a>
            
            <a routerLink="/my-account" class="icon-btn" *ngIf="isLoggedIn; else loginLink">
              <i class="far fa-user"></i>
            </a>
            <ng-template #loginLink>
              <a routerLink="/login" class="icon-btn">
                <i class="far fa-user"></i>
              </a>
            </ng-template>
            
            <a routerLink="/cart" class="cart-btn">
              <i class="fas fa-shopping-cart"></i>
              <span class="badge" *ngIf="cartItemCount > 0">{{ cartItemCount }}</span>
            </a>
          </div>
          
          <button class="mobile-menu-btn" (click)="toggleMobileMenu()">
            <i class="fas" [ngClass]="{'fa-bars': !mobileMenuOpen, 'fa-times': mobileMenuOpen}"></i>
          </button>
        </div>
        
        <div class="mobile-menu" [ngClass]="{'open': mobileMenuOpen}">
          <ul>
            <li><a routerLink="/" (click)="closeMobileMenu()">HOME</a></li>
            <li><a routerLink="/about-us" (click)="closeMobileMenu()">ABOUT US</a></li>
            <li><a routerLink="/shop" (click)="closeMobileMenu()">SHOP ONLINE</a></li>
            <li><a routerLink="/contact" (click)="closeMobileMenu()">CONTACT US</a></li>
            <li><a routerLink="/wishlist" (click)="closeMobileMenu()">WISHLIST</a></li>
            <li *ngIf="isLoggedIn"><a routerLink="/my-account" (click)="closeMobileMenu()">MY ACCOUNT</a></li>
            <li *ngIf="!isLoggedIn"><a routerLink="/login" (click)="closeMobileMenu()">LOGIN</a></li>
            <li *ngIf="!isLoggedIn"><a routerLink="/register" (click)="closeMobileMenu()">REGISTER</a></li>
          </ul>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--white);
      box-shadow: var(--shadow);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 0;
    }
    
    .logo {
      display: flex;
      align-items: center;
    }
    
    .logo a {
      display: flex;
      align-items: center;
    }
    
    .logo img {
      height: 50px;
      margin-right: 8px;
    }
    
    .logo span {
      font-family: 'Cormorant Garamond', serif;
      font-size: 24px;
      font-weight: 600;
      color: var(--secondary-color);
    }
    
    .main-nav ul {
      display: flex;
      list-style: none;
    }
    
    .main-nav li {
      margin: 0 15px;
    }
    
    .main-nav a {
      color: var(--primary-color);
      font-weight: 500;
      padding-bottom: 5px;
      transition: var(--transition);
      position: relative;
    }
    
    .main-nav a::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: var(--primary-color);
      transition: var(--transition);
    }
    
    .main-nav a:hover::after,
    .main-nav a.active::after {
      width: 100%;
    }
    
    .header-actions {
      display: flex;
      align-items: center;
    }
    
    .icon-btn {
      position: relative;
      font-size: 18px;
      color: var(--text-color);
      margin: 0 10px;
      transition: var(--transition);
    }
    
    .icon-btn:hover {
      color: var(--primary-color);
    }
    
    .cart-btn {
      position: relative;
      background-color: var(--accent-color);
      width: 40px;
      height: 40px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-color);
      margin-left: 10px;
      transition: var(--transition);
    }
    
    .cart-btn:hover {
      background-color: #e6d600;
    }
    
    .badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background-color: var(--primary-color);
      color: var(--white);
      font-size: 10px;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: var(--primary-color);
    }
    
    .mobile-menu {
      display: none;
      background-color: var(--white);
      padding: 15px 0;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    
    .mobile-menu.open {
      max-height: 400px;
    }
    
    .mobile-menu ul {
      list-style: none;
    }
    
    .mobile-menu li {
      margin: 10px 0;
    }
    
    .mobile-menu a {
      color: var(--primary-color);
      font-weight: 500;
      display: block;
      padding: 8px 0;
    }
    
    @media (max-width: 991px) {
      .main-nav {
        display: none;
      }
      
      .mobile-menu-btn {
        display: block;
      }
      
      .mobile-menu {
        display: block;
      }
    }
    
    @media (max-width: 576px) {
      .logo span {
        display: none;
      }
    }
  `]
})
export class HeaderComponent {
  mobileMenuOpen = false;
  isLoggedIn = false;
  cartItemCount = 0;
  wishlistItemCount = 0;
  
  constructor(
    private authService: AuthService, 
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}
  
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
    
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.length;
    });
    
    this.wishlistService.wishlistItems$.subscribe(items => {
      this.wishlistItemCount = items.length;
    });
  }
  
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  
  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}