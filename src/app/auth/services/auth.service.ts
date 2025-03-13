import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://crm-empleados.onrender.com/api/usuarios';
  private http: HttpClient = inject(HttpClient);
  private _username = '';

  register(user: any) {
    return this.http.post(`https://crm-empleados.onrender.com/api/usuarios/registro`, user);
  }

  login(credentials: any) {
    return this.http.post(`https://crm-empleados.onrender.com/api/usuarios/login`, credentials);
  }

  logout() {
    localStorage.clear();
    this.username = '';
  }

  public get username() {
    return this._username;
  }

  public set username(username: string) {
    this._username = username;
  }
}
