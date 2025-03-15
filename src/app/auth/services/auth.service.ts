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
  private _username = '';
  
  

  private _username = '';


  register(user: any) {
    return this.http.post(`https://crm-empleados.onrender.com/api/usuarios/registro`, user);
  }

  login(credentials: any) {
    return this.http.post(`https://crm-empleados.onrender.com/api/usuarios/login`, credentials);
  }


  onLogout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

 

  public get username() {
    return this._username;
  }

  public set username(username: string) {
    this._username = username;

  }

 

  public get username() {
    return this._username;
  }

  public set username(username: string) {
    this._username = username;

  }
}
