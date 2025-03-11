import { Routes } from '@angular/router';
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
        path: 'detalle-empleado/:id',
        component: EmployeeDetailPageComponent
    }
];
