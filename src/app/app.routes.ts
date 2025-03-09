import { Routes } from '@angular/router';
import { EmployeeDetailComponent } from '../components/employee-detail/employee-detail.component';
import { EmployeePageComponent } from '../components/employee-page/employee-page.component';

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
        component: EmployeeDetailComponent
    }
];
