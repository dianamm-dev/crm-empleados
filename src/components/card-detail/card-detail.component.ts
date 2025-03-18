import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent implements OnInit {
  employeeService: EmployeeService = inject(EmployeeService);
  router: Router = inject(Router);

  @Input() employee!: any;

  editMode: boolean = false;
  loading: boolean = false;
  editSuccess: boolean = false;
  deleteSuccess: boolean = false;
  error: string = '';

  userForm = new FormGroup({
    nombre: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    apellidos: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
    telefono: new FormControl({ value: '', disabled: true }, [Validators.required, CardDetailComponent.phoneValidator]),
    departamento: new FormControl({ value: '', disabled: true }, [Validators.required]),
    salario: new FormControl({ value: 0, disabled: true }, [Validators.required, Validators.min(1), Validators.max(1000000), CardDetailComponent.salaryValidator]),
  });

  static phoneValidator(control: AbstractControl): ValidationErrors | null {
    const regex = /^[0-9]{9}$/;
    if (control.value && !regex.test(control.value)) {
      return { invalidPhone: true };
    }
    return null;
  }

  static salaryValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value !== null && (isNaN(control.value) || control.value < 0)) {
      return { invalidSalary: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.userForm.controls.nombre.setValue(this.employee.nombre);
    this.userForm.controls.apellidos.setValue(this.employee.apellidos);
    this.userForm.controls.email.setValue(this.employee.email);
    this.userForm.controls.telefono.setValue(this.employee.telefono);
    this.userForm.controls.departamento.setValue(this.employee.departamento);
    this.userForm.controls.salario.setValue(this.employee.salario);
  }

  saveEmployee() {
    this.loading = true;

    // creamos usuario editado a partir de los valores del formulario
    let employeeEdited = {
      nombre: this.userForm.controls.nombre.value,
      apellidos: this.userForm.controls.apellidos.value,
      email: this.userForm.controls.email.value,
      telefono: this.userForm.controls.telefono.value,
      departamento: this.userForm.controls.departamento.value,
      salario: this.userForm.controls.salario.value,
    };

    // llamamos a la API
    this.employeeService.updateEmployeeById(this.employee._id, employeeEdited).subscribe({
      next: () => {
        this.employee = employeeEdited; //para que muestre en la interfaz el empleado actualizado
        this.editSuccess = true;
      },
      error: () => {
        this.loading = false;
        this.error = `Error guardando el usuario ${this.employee._id}`;

        // mantiene el mensaje de error por 2 segundos antes de ocultarlo
        setTimeout(() => {
          this.error = '';
        }, 2000);
      },
      complete: () => {
        this.loading = false;
        this.error = '';
        this.toggleEdit();

        // mantiene el mensaje por 2 segundos antes de ocultarlo
        setTimeout(() => {
          this.editSuccess = false;
        }, 2000);
      }
    });
  }

  deleteEmployee() {
    this.loading = true;

    // llamamos a la API
    this.employeeService.deleteEmployeeById(this.employee._id).subscribe({
      next: () => {
        this.deleteSuccess = true;
      },
      error: () => {
        this.loading = false;
        this.error = `Error eliminando el usuario ${this.employee._id}`;

        // mantiene el mensaje de error por 2 segundos antes de ocultarlo
        setTimeout(() => {
          this.error = '';
        }, 2000);
      },
      complete: () => {
        this.loading = false;
        this.error = '';
        this.toggleEdit();

        // mantiene el mensaje por 2 segundos antes de ocultarlo
        setTimeout(() => {
          this.deleteSuccess = false;
          this.router.navigate(['/empleados']);
        }, 2000);
      }
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;

    if (this.editMode) {
      this.userForm.controls['nombre'].enable();
      this.userForm.controls['apellidos'].enable();
      this.userForm.controls['email'].enable();
      this.userForm.controls['telefono'].enable();
      this.userForm.controls['departamento'].enable();
      this.userForm.controls['salario'].enable();
    } else {
      this.userForm.controls['nombre'].disable();
      this.userForm.controls['apellidos'].disable();
      this.userForm.controls['email'].disable();
      this.userForm.controls['telefono'].disable();
      this.userForm.controls['departamento'].disable();
      this.userForm.controls['salario'].disable();
    }
  }
}

