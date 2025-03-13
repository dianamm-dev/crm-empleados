import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://crm-empleados.onrender.com/api/usuarios';
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  
  

  register(user: any) {
    console.log(user);
    return this.http.post(`https://crm-empleados.onrender.com/api/usuarios/registro`, user);
  }

  login(credentials: any) {
    return this.http.post(`https://crm-empleados.onrender.com/api/usuarios/login`, credentials);
  }

  onLogout(): void {
  localStorage.clear();
  this.router.navigate(['/login']);
  }
}
