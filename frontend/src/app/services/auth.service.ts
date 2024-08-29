import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { User } from '../models/user';

interface LoginResponse {
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';
  private profileUrl = 'http://localhost:3000/api/users/profile';

  public isAdmin: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router, private http: HttpClient) { }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { name, email, password });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.fetchUserProfile().subscribe();
        }
      })
    );
  }

  private fetchUserProfile(): Observable<User> {
    return this.http.get<User>(this.profileUrl).pipe(
      tap(profile => {
        this.isAdmin = profile.role === 'admin';
        localStorage.setItem('isAdmin', JSON.stringify(this.isAdmin));
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isBrowser() && !!localStorage.getItem('token');
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      this.isAdmin = false;
    }
  }

  isAuthenticated(): boolean {
    return this.isBrowser() && !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('token') : null;
  }

  checkAdminStatus(): boolean {
    return this.isBrowser() && JSON.parse(localStorage.getItem('isAdmin') || 'false');
  }
}