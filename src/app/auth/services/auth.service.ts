import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://crm-empleados.onrender.com/api/usuarios';
  private http: HttpClient = inject(HttpClient);
  private _email = '';

  register(user: any) {
    return this.http.post(`https://crm-empleados.onrender.com/api/usuarios/registro`, user);
  }

  login(credentials: any) {
    this.email = credentials.email;
    return this.http.post(`https://crm-empleados.onrender.com/api/usuarios/login`, credentials);
  }

  logout() {
    localStorage.clear();
    this.email = '';
  }

  public get email() {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }
}
