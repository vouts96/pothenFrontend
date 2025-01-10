import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-new-submission',
  standalone: false,
  
  templateUrl: './user-new-submission.component.html',
  styleUrl: './user-new-submission.component.css'
})
export class UserNewSubmissionComponent {
  constructor(private authService: AuthService){}

  disconnect(): void {
    this.authService.logout()
  }
}
