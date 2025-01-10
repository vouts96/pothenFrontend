import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private jwtHelper = new JwtHelperService();
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.authorities || [];
    }
    return [];
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}