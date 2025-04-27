import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Fox Nuts / Phool Makhana Plain',
      price: 480,
      originalPrice: 550,
      description: 'Fox Nuts, a popular fasting food that offers superior health benefits compared to dry fruits like almonds and walnuts. Fox nuts powerhouse food is packed with protein, carbohydrates, fiber, magnesium, potassium, phosphorus, iron, and zinc. Fox nuts is high in fiber and low in calories, making it an excellent choice for those looking to lose weight.',
      image: 'assets/images/makhana1.webp',
      thumbnails: [
        'assets/images/makhana1.webp',
        'assets/images/makhana.jpg',
        'assets/images/makhana-waterlily-seeds-lotus-pile_1396-550.jpg',
        'assets/images/makhana-also-called-as-lotus-seeds-fox-nuts-are-popular-dry-snacks-from-india-served-bowl-selective-focus.jpg'
      ],
      category: 'Plain',
      tags: ['healthy', 'organic', 'snack'],
      inStock: true,
      sizeOptions: [
        { value: '100g', label: '100g' },
        { value: '150g', label: '150g' },
        { value: '250g', label: '250g', isDefault: true },
        { value: '50g', label: '50g' }
      ]
    },
    {
      id: '2',
      name: 'Fox Nuts Salt & Pepper / Makhana',
      price: 520,
      originalPrice: 600,
      description: 'Spice up your snacking routine with our Salt & Pepper Fox Nuts. These perfectly seasoned makhanas offer the perfect balance of salt and pepper, creating a flavorful and satisfying snack. Enjoy the same nutritional benefits of our plain fox nuts with an added kick of flavor.',
      image: 'assets/images/m2.jpg',
      thumbnails: [
        'assets/images/m2.jpg'
      ],
      category: 'Flavored',
      tags: ['spicy', 'seasoned', 'snack'],
      inStock: true,
      sizeOptions: [
        { value: '100g', label: '100g' },
        { value: '150g', label: '150g' },
        { value: '250g', label: '250g', isDefault: true }
      ]
    }
   
  ];
  
  constructor() {}
  
  getProducts(): Observable<Product[]> {
    return of(this.products);
  }
  
  getProductById(id: string): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }
  
  getProductsByCategory(category: string): Observable<Product[]> {
    const filteredProducts = this.products.filter(p => p.category === category);
    return of(filteredProducts);
  }
}