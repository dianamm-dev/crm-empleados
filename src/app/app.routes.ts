import { Routes } from '@angular/router';
import { EmployeePageComponent } from '../components/employee-page/employee-page.component';
import { BodyComponent } from './body/body.component';
import { Error404Component } from './error-404/error-404.component';


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
        path: '**',
        component: Error404Component
    }
    
];
