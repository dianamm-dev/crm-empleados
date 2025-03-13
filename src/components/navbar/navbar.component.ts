import { Router } from '@angular/router';
import { AuthService } from './../../app/auth/services/auth.service';
import { Component, inject, Input } from '@angular/core';




@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private authService: AuthService = inject(AuthService);
 

   onLogout(): void {
    this.authService.onLogout();
  }
}
