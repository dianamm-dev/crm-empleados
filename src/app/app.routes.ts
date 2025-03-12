import { Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { Error404Component } from './error-404/error-404.component';
import { EmployeeDetailPageComponent } from '../pages/employee-detail-page/employee-detail-page.component';
import { EmployeePageComponent } from '../pages/employee-page/employee-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'empleados',
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
        path: '**',
        component: Error404Component
    }
];
