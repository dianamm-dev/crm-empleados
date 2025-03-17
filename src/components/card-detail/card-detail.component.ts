import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent implements OnInit {
  @Input() employee!: any;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();

  editMode: boolean = false;

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

  editEmployee() {
    this.edit.emit(this.employee);
  }

  deleteEmployee() {
    this.delete.emit(this.employee.id);
  }

  saveEmployee() {
    // lógica de guardado

    this.toggleEdit();
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

