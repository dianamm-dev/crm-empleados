import { Routes } from '@angular/router';
import { EmployeeDetailPageComponent } from '../pages/employee-detail-page/employee-detail-page.component';
import { EmployeePageComponent } from '../pages/employee-page/employee-page.component';
import { LoginComponent } from './auth/components/login/login.component';
import { PasswordComponent } from './auth/components/password/password.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';  
import { RegisterComponent } from './auth/components/register/register.component';
import { BodyComponent } from './body/body.component';
import { Error404Component } from './error-404/error-404.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'empleados',
        component: EmployeePageComponent
    },
    {
        path: 'home',
        component: BodyComponent
    },
    {
        path: 'detalle-empleado/:id',
        component: EmployeeDetailPageComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'password',
        component: PasswordComponent
    },
    {
        path: 'add-employee',
        component: AddEmployeeComponent
    },
    {
        path: '**',
        component: Error404Component
    },
    {
        path: 'error-404',
        component: Error404Component
    }
];
