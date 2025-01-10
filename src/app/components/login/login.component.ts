import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Assuming you're using plain CSS
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      console.log('Login form submitted!', { username, password });

      // Add your authentication logic here, e.g., calling an API
      // Example:
      // this.authService.login(username, password).subscribe(response => {
      //   console.log('Login successful!', response);
      // }, error => {
      //   console.error('Login failed', error);
      // });
    } else {
      console.log('Form is invalid');
    }
  }
}
