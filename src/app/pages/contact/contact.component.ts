import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="hero-section">
          <div class="container">
            <div class="hero-content">
              <h1>Contact</h1>
            </div>
          </div>
      </div>
    <div class="container">
      <div class="contact-page">
    
        
        <div class="contact-content">
          <div class="contact-form-section">
            <h2>Send us a message</h2>
            <p>We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.</p>
            
            <form class="contact-form" (ngSubmit)="submitForm()">
              <div class="form-group">
                <label for="name">Name *</label>
                <input type="text" id="name" name="name" [(ngModel)]="contactForm.name" required>
              </div>
              
              <div class="form-group">
                <label for="email">Email *</label>
                <input type="email" id="email" name="email" [(ngModel)]="contactForm.email" required>
              </div>
              
              <div class="form-group">
                <label for="subject">Subject *</label>
                <input type="text" id="subject" name="subject" [(ngModel)]="contactForm.subject" required>
              </div>
              
              <div class="form-group">
                <label for="message">Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  [(ngModel)]="contactForm.message" 
                  required
                ></textarea>
              </div>
              
              <button type="submit" class="submit-btn" [disabled]="!isFormValid()">SEND MESSAGE</button>
            </form>
          </div>
          
          <div class="contact-info-section">
            <div class="contact-card">
              <h3>Contact Information</h3>
              
              <div class="info-item">
                <i class="fas fa-phone"></i>
                <div>
                  <h4>Phone</h4>
                  <p>+918850114685</p>
                </div>
              </div>
              
              <div class="info-item">
                <i class="fas fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <p>businessfitbytes.in</p>
                </div>
              </div>
              
              <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                  <h4>Address</h4>
                  <p>Borivali East, Mumbai</p>
                </div>
              </div>
            </div>
            
            <div class="map-section">
              <h3>Our Location</h3>
              <div class="map-container" id="map"></div>
            </div>
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
    .contact-page {
      margin-bottom: 60px;
    }
    
    .contact-page h1 {
      margin-bottom: 30px;
      font-size: 28px;
    }
    
    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
    
    .contact-form-section h2,
    .contact-info-section h3 {
      margin-bottom: 20px;
    }
    
    .contact-form-section p {
      margin-bottom: 20px;
      color: #666;
    }
    
    .contact-form {
      background-color: var(--white);
      padding: 30px;
      border-radius: 8px;
      box-shadow: var(--shadow);
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }
    
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .form-group textarea {
      resize: vertical;
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
    
    .contact-card {
      background-color: var(--white);
      padding: 30px;
      border-radius: 8px;
      box-shadow: var(--shadow);
      margin-bottom: 30px;
    }
    
    .info-item {
      display: flex;
      margin-bottom: 20px;
    }
    
    .info-item:last-child {
      margin-bottom: 0;
    }
    
    .info-item i {
      width: 40px;
      height: 40px;
      background-color: var(--primary-color);
      color: var(--white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
    }
    
    .info-item h4 {
      margin-bottom: 5px;
      font-size: 16px;
    }
    
    .map-section h3 {
      margin-bottom: 15px;
    }
    
    .map-container {
      height: 300px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow);
      background-color: #eee;
    }
    
    @media (max-width: 991px) {
      .contact-content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  constructor() {}
  
  ngAfterViewInit() {
    this.initMap();
  }
  
  initMap() {
    const mapElement = document.getElementById('map');
    if (mapElement && (window as any).google && (window as any).google.maps) {
      const location = { lat: 19.2183, lng: 72.8545 }; // Borivali Mumbai coordinates
      const map = new (window as any).google.maps.Map(mapElement, {
        zoom: 14,
        center: location,
      });
      
      new (window as any).google.maps.Marker({
        position: location,
        map: map,
        title: 'FitBytes'
      });
    }
  }
  
  isFormValid(): boolean {
    return (
      this.contactForm.name.trim() !== '' &&
      this.contactForm.email.trim() !== '' &&
      this.contactForm.subject.trim() !== '' &&
      this.contactForm.message.trim() !== ''
    );
  }
  
  submitForm(): void {
    if (!this.isFormValid()) return;
    
    // In a real app, this would send the form data to a server
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}