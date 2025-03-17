import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

addEmployeeData: any;
closeModalFlag: any;
  employeeForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      departamento: ['', Validators.required],
      salario: ['', [Validators.required, Validators.min(0)]]
    });
  }

  addEmployee() {
    if (this.employeeForm.valid) {
      this.successMessage = `El empleado ${this.employeeForm.value.nombre} se ha añadido con éxito.`;
      this.errorMessage = '';
      this.employeeForm.reset();
    } else {
      this.errorMessage = 'Por favor completa todos los campos correctamente.';
      this.successMessage = '';
    }
  }

  closeModal() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}
