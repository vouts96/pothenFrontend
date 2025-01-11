import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Assuming you're using plain CSS
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

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
      console.log('Login form submitted!', { username, password });

      const credentials = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
        rememberMe: true // Include rememberMe flag
      };

      this.authService.login(credentials).subscribe(response => {
        console.log('Login successful!', response);
        this.authService.saveToken(response.id_token)
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
}
