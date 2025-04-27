import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="container">
      <div class="account-page">
        <div class="account-sidebar">
          <div class="user-info">
            <div class="avatar">{{ getUserInitial() }}</div>
            <h3>{{ user?.name }}</h3>
            <p>{{ user?.email }}</p>
          </div>
          
          <nav class="sidebar-nav">
            <ul>
              <li>
                <a 
                  (click)="setActiveTab('dashboard')" 
                  [class.active]="activeTab === 'dashboard'"
                >
                  <i class="fas fa-tachometer-alt"></i> Dashboard
                </a>
              </li>
              <li>
                <a 
                  (click)="setActiveTab('orders')" 
                  [class.active]="activeTab === 'orders'"
                >
                  <i class="fas fa-shopping-bag"></i> Orders
                </a>
              </li>
              <li>
                <a 
                  (click)="setActiveTab('addresses')" 
                  [class.active]="activeTab === 'addresses'"
                >
                  <i class="fas fa-map-marker-alt"></i> Addresses
                </a>
              </li>
              <li>
                <a 
                  (click)="setActiveTab('account-details')" 
                  [class.active]="activeTab === 'account-details'"
                >
                  <i class="fas fa-user"></i> Account details
                </a>
              </li>
              <li>
                <a (click)="logout()">
                  <i class="fas fa-sign-out-alt"></i> Logout
                </a>
              </li>
            </ul>
          </nav>
        </div>
        
        <div class="account-content">
          <!-- Dashboard Tab -->
          <div class="tab-content" *ngIf="activeTab === 'dashboard'">
            <h2>Dashboard</h2>
            <p>
              Hello, <strong>{{ user?.name }}</strong> (not <strong>{{ user?.name }}</strong>? <a (click)="logout()">Log out</a>)
            </p>
            <p>
              From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
            </p>
            
            <div class="dashboard-actions">
              <a routerLink="/shop" class="btn btn-primary">Shop Now</a>
              <a routerLink="/wishlist" class="btn btn-outline">View Wishlist</a>
            </div>
          </div>
          
          <!-- Orders Tab -->
          <div class="tab-content" *ngIf="activeTab === 'orders'">
            <h2>Orders</h2>
            
            <div class="no-orders">
              <p>No order has been made yet.</p>
              <a routerLink="/shop" class="btn btn-primary">Browse Products</a>
            </div>
          </div>
          
          <!-- Addresses Tab -->
          <div class="tab-content" *ngIf="activeTab === 'addresses'">
            <h2>Addresses</h2>
            
            <div class="addresses">
              <div class="address-card">
                <h3>Billing Address</h3>
                <p>You have not set up this type of address yet.</p>
                <button class="btn btn-outline">Add</button>
              </div>
              
              <div class="address-card">
                <h3>Shipping Address</h3>
                <p>You have not set up this type of address yet.</p>
                <button class="btn btn-outline">Add</button>
              </div>
            </div>
          </div>
          
          <!-- Account Details Tab -->
          <div class="tab-content" *ngIf="activeTab === 'account-details'">
            <h2>Account Details</h2>
            
            <form class="account-form">
              <div class="form-group">
                <label for="firstName">First name *</label>
                <input type="text" id="firstName" name="firstName" [(ngModel)]="accountForm.firstName">
              </div>
              
              <div class="form-group">
                <label for="lastName">Last name *</label>
                <input type="text" id="lastName" name="lastName" [(ngModel)]="accountForm.lastName">
              </div>
              
              <div class="form-group">
                <label for="displayName">Display name *</label>
                <input type="text" id="displayName" name="displayName" [(ngModel)]="accountForm.displayName">
                <small>This will be how your name will be displayed in the account section and in reviews</small>
              </div>
              
              <div class="form-group">
                <label for="email">Email address *</label>
                <input type="email" id="email" name="email" [(ngModel)]="accountForm.email">
              </div>
              
              <h3>Password Change</h3>
              
              <div class="form-group">
                <label for="currentPassword">Current password (leave blank to leave unchanged)</label>
                <input type="password" id="currentPassword" name="currentPassword" [(ngModel)]="accountForm.currentPassword">
              </div>
              
              <div class="form-group">
                <label for="newPassword">New password (leave blank to leave unchanged)</label>
                <input type="password" id="newPassword" name="newPassword" [(ngModel)]="accountForm.newPassword">
              </div>
              
              <div class="form-group">
                <label for="confirmPassword">Confirm new password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" [(ngModel)]="accountForm.confirmPassword">
              </div>
              
              <button type="submit" class="btn btn-primary">Save changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .account-page {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 30px;
      margin-bottom: 60px;
    }
    
    .account-sidebar {
      background-color: var(--white);
      border-radius: 8px;
      box-shadow: var(--shadow);
      overflow: hidden;
    }
    
    .user-info {
      padding: 30px;
      text-align: center;
      background-color: var(--primary-color);
      color: var(--white);
    }
    
    .avatar {
      width: 80px;
      height: 80px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      margin: 0 auto 15px;
    }
    
    .user-info h3 {
      margin-bottom: 5px;
      font-size: 18px;
      color: var(--white);
    }
    
    .user-info p {
      font-size: 14px;
      opacity: 0.8;
    }
    
    .sidebar-nav ul {
      list-style: none;
    }
    
    .sidebar-nav a {
      display: block;
      padding: 15px 20px;
      border-bottom: 1px solid #eee;
      transition: var(--transition);
      cursor: pointer;
    }
    
    .sidebar-nav a:hover,
    .sidebar-nav a.active {
      background-color: #f9f9f9;
      color: var(--primary-color);
    }
    
    .sidebar-nav i {
      margin-right: 10px;
      width: 20px;
      text-align: center;
    }
    
    .account-content {
      background-color: var(--white);
      border-radius: 8px;
      box-shadow: var(--shadow);
      padding: 30px;
    }
    
    .tab-content h2 {
      margin-bottom: 20px;
      font-size: 24px;
    }
    
    .dashboard-actions {
      display: flex;
      gap: 15px;
      margin-top: 20px;
    }
    
    .addresses {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    
    .address-card {
      border: 1px solid #eee;
      padding: 20px;
      border-radius: 4px;
    }
    
    .address-card h3 {
      margin-bottom: 10px;
    }
    
    .address-card p {
      margin-bottom: 15px;
      color: #666;
    }
    
    .account-form .form-group {
      margin-bottom: 20px;
    }
    
    .account-form label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }
    
    .account-form input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .account-form small {
      display: block;
      margin-top: 5px;
      color: #666;
      font-size: 12px;
    }
    
    .account-form h3 {
      margin: 30px 0 20px;
      font-size: 18px;
    }
    
    .no-orders {
      padding: 40px;
      text-align: center;
      border: 1px solid #eee;
      border-radius: 4px;
    }
    
    .no-orders p {
      margin-bottom: 20px;
    }
    
    .btn {
      display: inline-block;
      padding: 10px 20px;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
    }
    
    .btn-primary {
      background-color: var(--primary-color);
      color: var(--white);
      border: none;
    }
    
    .btn-primary:hover {
      background-color: #A64CA6;
    }
    
    .btn-outline {
      background-color: transparent;
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
    }
    
    .btn-outline:hover {
      background-color: var(--primary-color);
      color: var(--white);
    }
    
    @media (max-width: 991px) {
      .account-page {
        grid-template-columns: 1fr;
      }
      
      .addresses {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class MyAccountComponent implements OnInit {
  user: any;
  activeTab: string = 'dashboard';
  
  accountForm = {
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  
  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }
    
    // Pre-fill form
    const nameParts = this.user.name.split(' ');
    this.accountForm.firstName = nameParts[0] || '';
    this.accountForm.lastName = nameParts.slice(1).join(' ') || '';
    this.accountForm.displayName = this.user.name;
    this.accountForm.email = this.user.email;
  }
  
  getUserInitial(): string {
    return this.user?.name.charAt(0).toUpperCase() || 'U';
  }
  
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  
  logout(): void {
    this.authService.logout();
  }
}