import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://crm-empleados.onrender.com/api/usuarios';
  private http: HttpClient = inject(HttpClient);

  register(user: any) {
    console.log(user);
    return this.http.post(`https://crm-empleados.onrender.com/api/usuarios/registro`, user);
  }

  login(credentials: any) {
    return this.http.post(`https://crm-empleados.onrender.com/api/usuarios/login`, credentials);
  }
}
