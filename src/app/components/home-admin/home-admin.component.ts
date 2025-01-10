import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home-admin',
  standalone: false,
  
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {
  constructor(private authService: AuthService){}
  
    disconnect(): void {
      this.authService.logout()
    }
}
