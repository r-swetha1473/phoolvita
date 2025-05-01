import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="hero-section">
          <div class="container">
            <div class="hero-content">
              <h1>About Us</h1>
            </div>
          </div>
      </div>
    <div class="container">
      
        
        <div class="about-content">
         
          
          <div class="about-text">
            <h2>Our Story</h2>
            <p>
              PhoolVita was founded with a simple mission: to provide premium quality Makhana (Fox Nuts) to health-conscious consumers. We started our journey in 2023 when we realized that despite its incredible nutritional benefits, quality Makhana was hard to find in the market.
            </p>
            
            <p>
              Being passionate about healthy snacking, we decided to bridge this gap by sourcing the finest Makhanas directly from the farms of Bihar, India - the region known for producing the best quality fox nuts in the world.
            </p>
            
            <p>
              Today, PhoolVita is proud to offer a range of both plain and flavored Makhana, processed and packaged with care to preserve their nutritional integrity and deliver a superior snacking experience to our customers.
            </p>
            
            <h2>Our Quality Promise</h2>
            <p>
              At PhoolVita, quality is not just a promise but a commitment. We ensure that our Makhana goes through rigorous quality checks before reaching your doorstep. Our products are:
            </p>
            
            <ul>
              <li>100% Natural with no artificial additives or preservatives</li>
              <li>Sourced directly from trusted farms</li>
              <li>Processed in hygienic conditions</li>
              <li>Packed in eco-friendly packaging</li>
              <li>Rich in protein, calcium, and other essential nutrients</li>
            </ul>
            
            <h2>Why Choose PhoolVita?</h2>
            <div class="features-grid">
              <div class="feature-card">
                <i class="fas fa-leaf"></i>
                <h3>Premium Quality</h3>
                <p>We source only the finest Makhana to ensure superior taste and nutritional value.</p>
              </div>
              
              <div class="feature-card">
                <i class="fas fa-heart"></i>
                <h3>Health-Focused</h3>
                <p>Our products are designed to support a healthy lifestyle without compromising on taste.</p>
              </div>
              
              <div class="feature-card">
                <i class="fas fa-truck"></i>
                <h3>Reliable Delivery</h3>
                <p>We ensure prompt delivery so you never run out of your favorite healthy snack.</p>
              </div>
              
              <div class="feature-card">
                <i class="fas fa-users"></i>
                <h3>Customer Satisfaction</h3>
                <p>Your satisfaction is our priority, and we strive to exceed your expectations every time.</p>
              </div>
            </div>
            
            <div class="cta-section">
              <h2>Ready to experience the PhoolVita difference?</h2>
              <a routerLink="/shop" class="btn btn-primary">Shop Now</a>
            </div>
          </div>
        </div>
      </div>
   
  `,
  styles: [`
   .hero-section {
    background-image: url('/assets/images/makhana-also-called-as-lotus-seeds-fox-nuts-are-popular-dry-snacks-from-india-served-bowl-selective.jpg');
      background-size: cover;
      background-position: center;
      height: 500px;
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 40px;
    }
    
    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    .hero-content {
      position: relative;
      color: var(--white);
      max-width: 600px;
      padding: 20px;
    }
    
    .hero-content h1 {
      font-size: 125px;
      margin-bottom: 16px;
      color: var(--white-color);
    }
    
    .hero-content p {
      font-size: 20px;
      color: var(--text-color);
      margin-bottom: 24px;
    }
    .about-page {
      margin-bottom: 60px;
    }
    
    .about-header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .about-header h1 {
      font-size: 36px;
      margin-bottom: 10px;
    }
    
    .about-header p {
      color: #666;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .about-content {
      background-color: var(--white);
      border-radius: 8px;
      box-shadow: var(--shadow);
      overflow: hidden;
    }
    
    .about-image {
      height: 400px;
      overflow: hidden;
    }
    
    .about-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .about-text {
      padding: 40px;
    }
    
    .about-text h2 {
      margin-bottom: 20px;
      font-size: 28px;
    }
    
    .about-text p {
      margin-bottom: 20px;
      line-height: 1.6;
    }
    
    .about-text ul {
      margin-bottom: 30px;
      padding-left: 20px;
    }
    
    .about-text li {
      margin-bottom: 10px;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    
    .feature-card {
      text-align: center;
      padding: 30px;
      border: 1px solid #eee;
      border-radius: 8px;
      transition: var(--transition);
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow);
    }
    
    .feature-card i {
      font-size: 36px;
      color: var(--primary-color);
      margin-bottom: 15px;
    }
    
    .feature-card h3 {
      margin-bottom: 10px;
    }
    
    .cta-section {
      text-align: center;
      background-color: #f9f9f9;
      padding: 40px;
      border-radius: 8px;
      margin-top: 40px;
    }
    
    .cta-section h2 {
      margin-bottom: 20px;
    }
    
    .btn-primary {
      display: inline-block;
      padding: 12px 30px;
      background-color: var(--primary-color);
      color: var(--white);
      border-radius: 4px;
      font-weight: 500;
      transition: var(--transition);
    }
    
    .btn-primary:hover {
      background-color: #A64CA6;
    }
  `]
})
export class AboutUsComponent {}