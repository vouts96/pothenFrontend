import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-middleware',
  standalone: false,
  
  templateUrl: './middleware.component.html',
  styleUrl: './middleware.component.css'
})
export class MiddlewareComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const code = params['code']; // Get 'code' from the URL

      if (code) {
        console.log('Code found in URL:', code);
        this.authService.loginOauth2(code).subscribe(response => {
          //console.log('Login successful!', response);
          this.authService.saveToken(response.id_token);
          this.authService.saveOAuthMethod('oauth2');
          const roles = this.authService.getRoles();
          this.authService.saveRoles(roles);
  
          // Redirect based on role
          if (roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/admin/home']);
          } else if (roles.includes('ROLE_USER')) {
            this.router.navigate(['/user/home']);
          }
        }, error => {
          console.error('Oauth2 Login failed', error);
          alert('Απέτυχε η αυθεντικοποίηση μέσω taxisnet')
          this.router.navigate(['/login'])
        })
      } 
      else if (this.authService.isAuthenticated()) {
        const roles = this.authService.getRoles();

        // Redirect based on authenticated role
        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin/home']);
        } else if (roles.includes('ROLE_USER')) {
          this.router.navigate(['/user/home']);
        }
      } 
      else {
        console.log('No code found and not authenticated, redirecting to login');
        this.router.navigate(['/login']);
      }
    });
  }
}
