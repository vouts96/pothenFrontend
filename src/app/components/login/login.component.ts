import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Assuming you're using plain CSS
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  selectedTab: string = 'taxisnet'; // Default tab
  private client_id = environment.client_id;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const roles = this.authService.getRoles();

      // Redirect based on role
      if (roles.includes('ROLE_ADMIN')) {
        this.router.navigate(['/admin/home']);
      } else if (roles.includes('ROLE_USER')) {
        this.router.navigate(['/user/home']);
      }
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      //console.log('Login form submitted!', { username, password });

      const credentials = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
        rememberMe: true // Include rememberMe flag
      };

      this.authService.login(credentials).subscribe(response => {
        //console.log('Login successful!', response);
        this.authService.saveToken(response.id_token);
        this.authService.saveOAuthMethod('jwt');
        const roles = this.authService.getRoles()
        this.authService.saveRoles(roles);

        // Redirect based on role
        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin/home']);
        } else if (roles.includes('ROLE_USER')) {
          this.router.navigate(['/user/home']);
        }
      }, error => {
        console.error('Login failed', error);
        alert('Λάθος κωδικός ή όνομα χρήστη')
      });
    } else {
      console.log('Form is invalid');
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  redirectToTaxisnet() {
    window.location.href = `https://test.gsis.gr/oauth2servergov/oauth/authorize?response_type=code&client_id=${this.client_id}`;
}

}
