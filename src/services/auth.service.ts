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
  private oauthMethod = 'jwt';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, credentials);
  }

  loginOauth2(code: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/authenticate-oauth2?code=${code}`); 
  }

  loginKeycloak(code: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/authenticate-keycloak?code=${code}`); 
  }
  

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  saveOAuthMethod(method: string){
    localStorage.setItem(this.oauthMethod, method);
  }

  getOAuthMethod(): string | null {
    return localStorage.getItem(this.oauthMethod);
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

  logout_oauth2(){
    localStorage.removeItem(this.tokenKey);
    window.location.href = environment.logoutURL;
  }

  logout_keycloak(){
    window.location.href = environment.logoutKeycloakURL;
    localStorage.removeItem(this.tokenKey);
  }
  

  getAccount(): Observable<any> { 
    const token = localStorage.getItem('auth-token'); // Retrieve the token from localStorage
    const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });

    return this.http.get(`${this.apiUrl}/account`, { headers });
  }
}
