import { Component, inject } from '@angular/core';
import { AuthService } from '../../app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public authService: AuthService = inject(AuthService);


}
