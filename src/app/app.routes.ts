import { Routes } from '@angular/router';
import { EmployeePageComponent } from '../components/employee-page/employee-page.component';
import { BodyComponent } from './body/body.component';

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

    /* {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: BodyComponent
    } */
];
