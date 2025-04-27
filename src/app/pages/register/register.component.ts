import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="container">
      <div class="auth-page">
        <div class="auth-card">
          <h2>Register</h2>
          
          <form class="auth-form" (ngSubmit)="register()">
            <div class="form-group">
              <label for="name">Full Name *</label>
              <input 
                type="text" 
                id="name" 
                [(ngModel)]="registerForm.name" 
                name="name" 
                required
              >
            </div>
            
            <div class="form-group">
              <label for="email">Email address *</label>
              <input 
                type="email" 
                id="email" 
                [(ngModel)]="registerForm.email" 
                name="email" 
                required
              >
            </div>
            
            <div class="form-group">
              <label for="password">Password *</label>
              <input 
                type="password" 
                id="password" 
                [(ngModel)]="registerForm.password" 
                name="password" 
                required
              >
            </div>
            
            <div class="form-group">
              <label for="confirmPassword">Confirm Password *</label>
              <input 
                type="password" 
                id="confirmPassword" 
                [(ngModel)]="registerForm.confirmPassword" 
                name="confirmPassword" 
                required
              >
            </div>
            
            <div class="form-check">
              <input 
                type="checkbox" 
                id="termsAccepted" 
                [(ngModel)]="registerForm.termsAccepted" 
                name="termsAccepted"
                required
              >
              <label for="termsAccepted">
                I agree to the <a routerLink="/terms">Terms and Conditions</a>
              </label>
            </div>
            
            <button type="submit" class="submit-btn" [disabled]="isSubmitting || !canRegister()">
              <span *ngIf="!isSubmitting">REGISTER</span>
              <span *ngIf="isSubmitting">REGISTERING...</span>
            </button>
          </form>
          
          <div class="divider">
            <span>OR</span>
          </div>
          
          <button type="button" class="google-btn" (click)="googleLogin()">
            <i class="fab fa-google"></i>
            Register with Google
          </button>
          
          <div class="auth-footer">
            <p>Already have an account? <a routerLink="/login">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 60px 0;
    }
    
    .auth-card {
      background-color: var(--white);
      border-radius: 8px;
      box-shadow: var(--shadow);
      padding: 40px;
      width: 100%;
      max-width: 500px;
    }
    
    .auth-card h2 {
      margin-bottom: 30px;
      text-align: center;
      font-size: 28px;
    }
    
    .auth-form {
      margin-bottom: 20px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }
    
    .form-group input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .form-check {
      display: flex;
      align-items: flex-start;
      margin-bottom: 20px;
    }
    
    .form-check input {
      margin-right: 10px;
      margin-top: 5px;
    }
    
    .form-check a {
      color: var(--primary-color);
    }
    
    .form-check a:hover {
      text-decoration: underline;
    }
    
    .submit-btn {
      display: block;
      width: 100%;
      padding: 12px;
      background-color: var(--primary-color);
      color: var(--white);
      border: none;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
    }
    
    .submit-btn:hover {
      background-color: #A64CA6;
    }
    
    .submit-btn:disabled {
      background-color: #ddd;
      color: #999;
      cursor: not-allowed;
    }
    
    .divider {
      text-align: center;
      margin: 20px 0;
      position: relative;
    }
    
    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background-color: #ddd;
    }
    
    .divider span {
      position: relative;
      background-color: var(--white);
      padding: 0 15px;
      color: #666;
    }
    
    .google-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 12px;
      background-color: #4285F4;
      color: var(--white);
      border: none;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
    }
    
    .google-btn:hover {
      background-color: #357ae8;
    }
    
    .google-btn i {
      margin-right: 10px;
    }
    
    .auth-footer {
      text-align: center;
      margin-top: 20px;
    }
    
    .auth-footer a {
      color: var(--primary-color);
      font-weight: 500;
      transition: var(--transition);
    }
    
    .auth-footer a:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  registerForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  };
  
  isSubmitting = false;
  
  constructor(private authService: AuthService, private router: Router) {}
  
  canRegister(): boolean {
    return (
      !!this.registerForm.name &&
      !!this.registerForm.email &&
      !!this.registerForm.password &&
      this.registerForm.password === this.registerForm.confirmPassword &&
      this.registerForm.termsAccepted
    );
  }
  
  register(): void {
    if (!this.canRegister()) return;
    
    this.isSubmitting = true;
    
    this.authService.register({
      name: this.registerForm.name,
      email: this.registerForm.email,
      password: this.registerForm.password
    }).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.isSubmitting = false;
      },
      error: () => {
        alert('An error occurred. Please try again later.');
        this.isSubmitting = false;
      }
    });
  }
  
  googleLogin(): void {
    this.authService.googleLogin().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        alert('An error occurred with Google login. Please try again later.');
      }
    });
  }
}