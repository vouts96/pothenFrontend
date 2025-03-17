import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { windowTime } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService: AuthService){}
    
      disconnect(): void {
        if(this.authService.getOAuthMethod() == 'jwt'){
          this.authService.logout()
        }
        else if(this.authService.getOAuthMethod() == 'oauth2'){
          this.authService.logout_oauth2()
        }
        
      }

}
