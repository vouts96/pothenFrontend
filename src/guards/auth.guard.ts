import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = route.data['roles'] as Array<string>;
    if (this.authService.isAuthenticated()) {
      const userRoles = this.authService.getRoles();
      if (!roles || roles.some((role) => userRoles.includes(role))) {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
