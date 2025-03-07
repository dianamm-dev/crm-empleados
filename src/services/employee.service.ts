import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private url: string = "https://crm-empleados.onrender.com/api/";
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjdjOWIyNDY2MTUyNWMwNmU0Zjk5ZDEwIiwidXNlcl9yb2xlIjoicmVndWxhciIsImlhdCI6MTc0MTM3MjA0NH0.1OhU_w8hbFuqVkuV9XNfQtj8v9BmhU5lXjWXBHPRT7k';

    private http: HttpClient = inject(HttpClient);

    getAllEmployees(): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: this.token,
        });

        return this.http.get(`${this.url}empleados`, { headers });
    }

}