import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home-user',
  standalone: false,
  
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent {

  constructor(private authService: AuthService){}

  disconnect(): void {
    this.authService.logout()
  }
}
