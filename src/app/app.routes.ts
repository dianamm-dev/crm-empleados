import { Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { Error404Component } from './error-404/error-404.component';
import { EmployeeDetailPageComponent } from '../pages/employee-detail-page/employee-detail-page.component';
import { EmployeePageComponent } from '../pages/employee-page/employee-page.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'register',
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
        path: '**',
        component: Error404Component
    }
];
