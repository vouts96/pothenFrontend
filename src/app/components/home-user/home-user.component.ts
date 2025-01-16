import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-user',
  standalone: false,
  
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent {

  constructor(private authService: AuthService, private router: Router){}

  disconnect(): void {
    this.authService.logout()
  }

  redirectToPageNewSubmission() : void {
    this.router.navigate(['/user/new-submission']);
  }

  redirectToPageMySubmissions() : void {
    this.router.navigate(['/user/my-submissions']);
  }
}
