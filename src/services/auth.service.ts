import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from '../config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private jwtHelper = new JwtHelperService();
  private tokenKey = 'auth-token';
  private rolesKey = 'user-roles';

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
      return decodedToken.auth || [];
    }
    return [];
  }

  saveRoles(roles: string[]) {
    localStorage.setItem(this.rolesKey, JSON.stringify(roles));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getAccount(): Observable<any> { 
    const token = localStorage.getItem('auth-token'); // Retrieve the token from localStorage
    const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });

    return this.http.get(`${this.apiUrl}/account`, { headers });
  }
}
