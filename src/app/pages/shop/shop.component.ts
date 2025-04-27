import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  template: `
      <div class="hero-section">
          <div class="container">
            <div class="hero-content">
              <h1>Shop Online</h1>
            </div>
          </div>
      </div>

    <div class="container">
      <div class="shop-container">
        <aside class="shop-sidebar">
          <div class="filter-section">
            <h3>Categories</h3>
            <ul class="category-list">
              <li>
                <button 
                  class="category-btn" 
                  [class.active]="selectedCategory === 'all'"
                  (click)="filterByCategory('all')"
                >
                  All Products
                </button>
              </li>
              <li *ngFor="let category of categories">
                <button 
                  class="category-btn" 
                  [class.active]="selectedCategory === category"
                  (click)="filterByCategory(category)"
                >
                  {{ category }}
                </button>
              </li>
            </ul>
          </div>
          
          <div class="filter-section">
            <h3>Price Range</h3>
            <div class="price-range">
              <input 
                type="range" 
                min="0" 
                max="1000" 
                step="50" 
                [(ngModel)]="priceFilter"
                (input)="applyFilters()"
              >
              <span>Up to ₹{{ priceFilter }}</span>
            </div>
          </div>
        </aside>
        
        <main class="shop-content">
          <div class="shop-header">
            <div class="shop-info">
              <p>Showing {{ filteredProducts.length }} product(s)</p>
            </div>
            
            <div class="shop-sort">
              <label for="sort">Sort by:</label>
              <select id="sort" [(ngModel)]="sortOption" (change)="sortProducts()">
                <option value="default">Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
              </select>
            </div>
          </div>
          
          <div class="products-grid" *ngIf="filteredProducts.length > 0">
            <div *ngFor="let product of filteredProducts">
              <app-product-card [product]="product"></app-product-card>
            </div>
          </div>
          
          <div class="no-products" *ngIf="filteredProducts.length === 0">
            <p>No products found matching your criteria.</p>
            <button class="btn btn-primary" (click)="resetFilters()">Reset Filters</button>
          </div>
        </main>
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

    
    .shop-container {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 30px;
      margin-bottom: 40px;
    }
    
    .shop-sidebar {
      background-color: var(--white);
      border-radius: 8px;
      padding: 20px;
      box-shadow: var(--shadow);
      align-self: start;
    }
    
    .filter-section {
      margin-bottom: 20px;
    }
    
    .filter-section h3 {
      margin-bottom: 15px;
      font-size: 18px;
    }
    
    .category-list {
      list-style: none;
    }
    
    .category-btn {
      display: block;
      width: 100%;
      text-align: left;
      padding: 8px 0;
      background: none;
      border: none;
      cursor: pointer;
      transition: var(--transition);
      color: var(--text-color);
    }
    
    .category-btn:hover,
    .category-btn.active {
      color: var(--primary-color);
      font-weight: 500;
    }
    
    .price-range {
      display: flex;
      flex-direction: column;
    }
    
    .price-range input {
      margin-bottom: 10px;
      accent-color: var(--primary-color);
    }
    
    .shop-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
    
    .shop-sort {
      display: flex;
      align-items: center;
    }
    
    .shop-sort label {
      margin-right: 10px;
    }
    
    .shop-sort select {
      padding: 5px 10px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .no-products {
      text-align: center;
      padding: 40px;
      background-color: var(--white);
      border-radius: 8px;
      box-shadow: var(--shadow);
    }
    
    .no-products p {
      margin-bottom: 20px;
    }
    
    @media (max-width: 991px) {
      .shop-container {
        grid-template-columns: 1fr;
      }
      
      .shop-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
    }
  `]
})
export class ShopComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';
  priceFilter: number = 1000;
  sortOption: string = 'default';
  
  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.allProducts = products;
      this.filteredProducts = [...products];
      
      // Extract unique categories
      const categorySet = new Set<string>();
      products.forEach(product => categorySet.add(product.category));
      this.categories = Array.from(categorySet);
      
      this.applyFilters();
    });
  }
  
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }
  
  applyFilters(): void {
    let result = [...this.allProducts];
    
    // Filter by category
    if (this.selectedCategory !== 'all') {
      result = result.filter(product => product.category === this.selectedCategory);
    }
    
    // Filter by price
    result = result.filter(product => product.price <= this.priceFilter);
    
    this.filteredProducts = result;
    this.sortProducts();
  }
  
  sortProducts(): void {
    switch (this.sortOption) {
      case 'price-low-high':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // No specific sorting, use default order
        this.filteredProducts = [...this.filteredProducts];
    }
  }
  
  resetFilters(): void {
    this.selectedCategory = 'all';
    this.priceFilter = 1000;
    this.sortOption = 'default';
    this.applyFilters();
  }
}