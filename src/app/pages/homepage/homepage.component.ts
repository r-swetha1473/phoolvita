import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  template: `
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1>Fit Bytes</h1>
          <p>Premium Quality Makhana & Dried Fruits</p>
          <a routerLink="/shop" class="btn btn-accent">SHOP NOW</a>
        </div>
      </div>
    </div>
    
    <div class="container">
      <section class="features-section">
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-box-open"></i>
            </div>
            <h3>Choose Product</h3>
            <p>Select from our premium range of products and add to cart</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-shopping-bag"></i>
            </div>
            <h3>Select a Package</h3>
            <p>Choose from different sizes according to your needs</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-truck"></i>
            </div>
            <h3>Delivery to Product</h3>
            <p>Fast and reliable delivery right to your doorstep</p>
          </div>
        </div>
      </section>
      
      <section class="product-highlight">
      <h2 class="section-title">Phool Makhana</h2>
        <div class="highlight-grid">
          <div class="highlight-image">
            <img src="assets/images/makhana-waterlily-seeds-lotus-pile_1396-550.jpg" alt="Makhana Close-up">
          </div>
          <div class="highlight-image">
            <img src="assets/images/makhana-also-called-as-lotus-seeds-fox-nuts-are-popular-dry-snacks-from-india-served-bowl-selective-focus_466689-19099.jpg" alt="Makhana in a Bowl">
          </div>
          <div class="highlight-image">
            <img src="assets/images/makhana-also-called-as-lotus-seeds-fox-nuts-are-popular-dry-snacks-from-india-served-bowl-selective-focus_466689-19090.jpg" alt="Makhana in Hand">
          </div>
        </div>
      </section>
      
      <section class="bestseller-section">
        <h2 class="section-title">Best Seller</h2>
        <p class="subtitle">Fox Nuts delivered to your door</p>
        
        <div class="products-grid">
          <div *ngFor="let product of featuredProducts">
            <app-product-card [product]="product"></app-product-card>
          </div>
        </div>
      </section>
      
      <section class="info-banner no-image">
        <div class="info-text-left">
          <h1>The<br>Makhana</h1>
        </div>
        <div class="info-text-right">
          <p><strong>Fit Bytes</strong> – Bringing you the finest quality Makhana directly from the heart of Bihar, India. Our premium, healthy snacks are carefully sourced to retain their natural goodness, ensuring every bite is packed with essential nutrients and delicious flavor. At Fit Bytes, we take pride in delivering farm-fresh Makhana, crafted with care to support your health and wellness journey. Whether you’re looking for a guilt-free snack or a superfood to energize your day, Fit Bytes is your trusted partner for wholesome, nutritious treats. Eat healthy, stay fit with Fit Bytes!</p>
          <a href="/shop" class="btn-learn-more">LEARN MORE</a>
        </div>
      </section>

      
      <section class="values-section">
        <div class="value-card">
          <i class="fas fa-leaf"></i>
          <h3>Raw & Organic - Free</h3>
          <p>100% natural products with no additives or preservatives</p>
        </div>
        
        <div class="value-card">
          <i class="fas fa-recycle"></i>
          <h3>Clean packaging</h3>
          <p>Using eco-friendly and biodegradable packaging solutions</p>
        </div>
        
        <div class="value-card">
          <i class="fas fa-check-circle"></i>
          <h3 >Premium Quality</h3>
          <p>We use premium quality ingredients for all our products</p>
        </div>
      </section>
      
      <section class="cta-section">
        <div class="cta-banner">
          <h2  class="section-title">We Care for Nature</h2>
        </div>
      </section>
      
      <section class="visit-section">
        <div class="visit-content">
          <h2  class="section-title">Visit with Products</h2>
          <p>Discover our wide range of premium quality Fox Nuts (Makhana). From plain to flavored, we've got it all. All our products are 100% natural, high in protein, and perfect for healthy snacking. Try the nutritious goodness of Makhanas today.</p>
          <a routerLink="/shop" class="btn btn-accent">SHOP NOW</a>
        </div>
        <div class="visit-image">
          <img src="https://i.ibb.co/7tL7LnF/makhana-wooden-bowl.jpg" alt="Makhana in wooden bowl">
        </div>
      </section>
      
      <section class="join-section">
        <h2  class="section-title">Join Our CSA</h2>
        <p>
          Phool Makhana (Fox Nuts) have always been a traditional favorite in many households in India. FitBytes is dedicated to bringing the nutritional goodness of these little powerhouses straight to your homes. We ensure you receive only the best quality Makhana, sourced directly from farms and processed under strict quality control.
        </p>
        <a routerLink="/contact" class="btn btn-primary">CONTACT US</a>
      </section>
    </div>
  `,
  styles: [`
    .hero-section {
      // background-image: url('https://i.ibb.co/mXvjnWV/makhana-bowl.jpg');
      // background-size: cover;
      // background-position: center;
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
      background-color: var(--light-bg);
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
      color: var(--primary-color);
    }
    
    .hero-content p {
      font-size: 20px;
      color: var(--text-color);
      margin-bottom: 24px;
    }
    
    .features-section {
      margin-bottom: 60px;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }
    
    .feature-card {
      background-color: var(--white);
      padding: 30px;
      border-radius: 8px;
      box-shadow: var(--shadow);
      text-align: center;
      transition: var(--transition);
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
    }
    
    .feature-icon {
      width: 60px;
      height: 60px;
      background-color: var(--primary-color);
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin: 0 auto 20px;
      font-size: 24px;
    }
    
    .feature-card h3 {
      margin-bottom: 10px;
    }
    
    .product-highlight {
      margin-bottom: 60px;
    }
    
    .highlight-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    
    .highlight-image {
      overflow: hidden;
      border-radius: 8px;
      height: 250px;
    }
 
    .highlight-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .highlight-image:hover img {
      transform: scale(1.05);
    }
    
    .bestseller-section {
      margin-bottom: 60px;
    }
    
    .subtitle {
      text-align: center;
      margin-bottom: 30px;
      color: #666;
    }
    
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 30px;
    }
    
    .info-banner.no-image {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 60px;
  background-color: #fdfaf6;
  font-family: 'Georgia', serif;
}

.info-text-left h1 {
  font-size: 6rem;
  color: purple;
  margin: 0;
  line-height: 1.1;
  font-weight: normal;
}

.info-text-right {
  max-width: 700px;
  font-family: 'Arial', sans-serif;
  font-size: 1.1rem;
  color: #111;
  line-height: 1.8;
}

.btn-learn-more {
  display: inline-block;
  background-color: #fffb00;
  color: black;
  font-weight: bold;
  padding: 12px 24px;
  margin-top: 20px;
  text-decoration: none;
  transition: background 0.3s ease;
}

.btn-learn-more:hover {
  background-color: #e6e200;
}

    .values-section {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin-bottom: 60px;
      text-align: center;
    }
    
    .value-card {
      padding: 30px;
      border-radius: 8px;
      background-color: var(--white);
      box-shadow: var(--shadow);
    }
    
    .value-card i {
      font-size: 40px;
      color: var(--primary-color);
      margin-bottom: 15px;
    }
    
    .cta-section {
      margin-bottom: 60px;
    }
    
    .cta-banner {
      background-color: var(--accent-color);
      padding: 40px;
      border-radius: 8px;
      text-align: center;
    }
    
    .cta-banner h2 {
      color: var(--text-color);
      margin: 0;
    }
    
    .visit-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
      margin-bottom: 60px;
    }
    
    .visit-content h2 {
      margin-bottom: 20px;
    }
    
    .visit-content p {
      margin-bottom: 20px;
    }
    
    .visit-image {
      border-radius: 8px;
      overflow: hidden;
    }
    
    .join-section {
      background-color: var(--accent-color);
      padding: 40px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 60px;
    }
    
    .join-section h2 {
      color: var(--text-color);
      margin-bottom: 20px;
    }
    
    .join-section p {
      margin-bottom: 20px;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }
    
    @media (max-width: 992px) {
      .info-banner,
      .visit-section {
        grid-template-columns: 1fr;
      }
      
      .hero-section {
        height: 400px;
      }
      
      .hero-content h1 {
        font-size: 36px;
      }
    }
    
    @media (max-width: 768px) {
      .highlight-grid {
        grid-template-columns: 1fr;
      }
      
      .values-section {
        grid-template-columns: 1fr;
      }
      
      .hero-section {
        height: 350px;
      }
    }
  `]
})
export class HomepageComponent implements OnInit {
  featuredProducts: Product[] = [];
  
  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 2);
    });
  }
}