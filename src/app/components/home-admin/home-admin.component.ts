import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  standalone: false,
  
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {
  constructor(private authService: AuthService, private router: Router){}
  
    disconnect(): void {
      this.authService.logout()
    }

    redirectToPage() : void {
      this.router.navigate(['/admin/all-submissions']);
    }

    redirectToPageEditForm(): void {
      this.router.navigate(['/admin/edit-metadata']);
    }
}
