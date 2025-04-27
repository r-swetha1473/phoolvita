import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';
  
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedInSubject.asObservable();
  
  constructor(private http: HttpClient, private router: Router) {}
  
  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  
  // For demo purposes - in a real app, this would be a server call
  login(email: string, password: string): Observable<any> {
    if (email === 'user@example.com' && password === 'password') {
      const mockResponse = {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          name: 'Demo User',
          email: email
        }
      };
      
      localStorage.setItem(this.TOKEN_KEY, mockResponse.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(mockResponse.user));
      this.loggedInSubject.next(true);
      
      return of(mockResponse);
    } else {
      return of({ error: 'Invalid credentials' });
    }
  }
  
  googleLogin(): Observable<any> {
    const mockResponse = {
      token: 'mock-google-jwt-token',
      user: {
        id: '2',
        name: 'Google User',
        email: 'google-user@example.com'
      }
    };
    
    localStorage.setItem(this.TOKEN_KEY, mockResponse.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(mockResponse.user));
    this.loggedInSubject.next(true);
    
    return of(mockResponse);
  }
  
  register(userData: any): Observable<any> {
    localStorage.setItem(this.TOKEN_KEY, 'new-user-token');
    localStorage.setItem(this.USER_KEY, JSON.stringify({
      id: '3',
      name: userData.name,
      email: userData.email
    }));
    this.loggedInSubject.next(true);
    
    return of({ success: true });
  }
  
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }
  
  getCurrentUser(): any {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }
}