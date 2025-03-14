import { Component } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
employeeForm: any;
addEmployee: any;
closeModal: any;
successMessage: any;
errorMessage: any;

}
