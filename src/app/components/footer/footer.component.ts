import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
  <div class="footer-top">
    <div class="container">
      <div class="footer-info">
        <div class="contact-info">
          <h3>Contact us</h3>
          <div class="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <a href="tel:+918850114685">+918850114685</a>
          </div>
          <div class="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <a href="mailto:business@fitbytes.in">businessitbytes.in</a>
          </div>
          <div class="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>Borivali East, Mumbai</span>
          </div>
        </div>
        
        <div class="ordering-info">
          <h3>Ordering & Delivery</h3>
          <p>Delivery is free for orders 5kg & above.</p>
          <p>All you need to do is meet our minimum spend. For more information read our <a href="#">FAQ</a></p>
        </div>
        
        <div class="location-info">
          <h3>Location Detail</h3>
          <div class="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15073.021522376116!2d72.86379016246096!3d19.21677764237693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0d42c756dad%3A0x8c37fbcb587be5ea!2sBorivali%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1653034060589!5m2!1sen!2sin" 
              width="100%" 
              height="150" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="footer-middle">
    <div class="container">
      <div class="logo-section">
        <a routerLink="/" class="footer-logo">
          <img src="https://i.ibb.co/cXy9Xz7/fitbytes-logo.png" alt="FitBytes Logo">
          <span>FITBYTES</span>
        </a>
      </div>
      
      <div class="footer-nav">
        <ul>
          <li><a routerLink="/">HOME</a></li>
          <li><a routerLink="/about">ABOUT US</a></li>
          <li><a routerLink="/shop">SHOP ONLINE</a></li>
          <li><a routerLink="/contact">CONTACT US</a></li>
        </ul>
      </div>
      
      <div class="social-links">
        <a href="https://facebook.com" target="_blank" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
          </svg>
        </a>
        <a href="https://instagram.com" target="_blank" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a href="https://youtube.com" target="_blank" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
  
  <div class="footer-bottom">
    <div class="container">
      <p>&copy; {{currentYear}} Fitbytes. All Rights Reserved.</p>
      <div class="footer-links">
        <a href="#">Terms & Conditions</a>
        <a href="#">Privacy & Cookie Policy</a>
      </div>
    </div>
  </div>
  
  <a href="#" class="back-to-top">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
    </svg>
    <span>UP</span>
  </a>
</footer>
  `,
  styles: [`
  .footer {
  position: relative;
  background-color: var(--white);
  border-top: 1px solid var(--gray-medium);
}

.footer-top {
  padding: 3rem 0;
  border-bottom: 1px solid var(--gray-medium);
}

.footer-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.contact-info h3,
.ordering-info h3,
.location-info h3 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.info-item svg {
  margin-right: 0.75rem;
  fill: var(--primary-color);
}

.info-item a {
  color: var(--gray-dark);
  transition: color 0.3s ease;
}

.info-item a:hover {
  color: var(--primary-color);
}

.ordering-info p {
  margin-bottom: 1rem;
}

.ordering-info a {
  color: var(--primary-color);
  text-decoration: underline;
}

.map-container {
  height: 150px;
  border-radius: 4px;
  overflow: hidden;
}

.footer-middle {
  padding: 2rem 0;
  border-bottom: 1px solid var(--gray-medium);
}

.footer-middle .container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
}

.footer-logo {
  display: flex;
  align-items: center;
}

.footer-logo img {
  height: 60px;
  margin-right: 0.5rem;
}

.footer-logo span {
  font-family: 'Libre Baskerville', serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--gray-dark);
}

.footer-nav ul {
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer-nav li {
  margin: 0 1rem;
}

.footer-nav a {
  color: var(--gray-dark);
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer-nav a:hover {
  color: var(--primary-color);
}

.social-links {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--white);
  border: 1px solid var(--gray-medium);
  transition: all 0.3s ease;
}

.social-link svg {
  fill: var(--primary-color);
  width: 20px;
  height: 20px;
}

.social-link:hover {
  background-color: var(--primary-color);
}

.social-link:hover svg {
  fill: var(--white);
}

.footer-bottom {
  padding: 1.5rem 0;
}

.footer-bottom .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  color: var(--gray-dark);
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--primary-color);
}

.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: var(--white);
  border: 1px solid var(--gray-medium);
  border-radius: 50%;
  box-shadow: var(--shadow);
  z-index: 99;
  transition: all 0.3s ease;
}

.back-to-top svg {
  fill: var(--primary-color);
}

.back-to-top span {
  font-size: 0.75rem;
  font-weight: 600;
}

.back-to-top:hover {
  background-color: var(--primary-color);
}

.back-to-top:hover svg,
.back-to-top:hover span {
  fill: var(--white);
  color: var(--white);
}

@media (max-width: 992px) {
  .footer-info {
    grid-template-columns: 1fr 1fr;
  }
  
  .location-info {
    grid-column: span 2;
  }
  
  .footer-middle .container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    text-align: center;
  }
  
  .footer-logo {
    justify-content: center;
  }
  
  .social-links {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .footer-info {
    grid-template-columns: 1fr;
  }
  
  .location-info {
    grid-column: span 1;
  }
  
  .footer-bottom .container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .footer-nav ul {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .footer-nav li {
    margin: 0;
  }
}
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
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
  
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}