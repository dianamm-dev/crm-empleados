import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private url: string = "https://crm-empleados.onrender.com/api/";

    private http: HttpClient = inject(HttpClient);

    getAllEmployees(): Observable<any> {
        const token: string = localStorage.getItem('token') ?? '';
        const headers = new HttpHeaders({
            Authorization: token,
        });

        return this.http.get(`${this.url}empleados`, { headers });
    }

    getEmployeeById(id: string) {
        const token: string = localStorage.getItem('token') ?? '';
        const headers = new HttpHeaders({
            Authorization: token,
        });

        return this.http.get(`${this.url}empleados/${id}`, { headers });
    }
}