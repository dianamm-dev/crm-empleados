import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private apiUrl = 'https://crm-empleados.onrender.com/api/usuarios';

  register(user: any) {
    return this.http.post(`${this.apiUrl}/registro`, user);
  }

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  onLogout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsername(): string {
    const user = JSON.parse(localStorage.getItem('username') || '{}');
    return user.username || '';
  }

}
