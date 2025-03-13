import { Component, inject, OnInit } from '@angular/core';
import { EmployeeCardComponent } from '../../components/employee-card/employee-card.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [EmployeeCardComponent, FilterComponent],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.css'
})
export class EmployeePageComponent implements OnInit {
  employeeService: EmployeeService = inject(EmployeeService);
  employees: any[] = [];
  selectionType: string = 'name';
  loading: boolean = true;
  error: string = '';

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (response) => {
        this.employees = response;
      },
      error: (e) => {
        this.loading = false;
        this.error = e.error.error;
      },
      complete: () => {
        this.loading = false;
        this.error = '';
      }
    });
  }

  typeChanged(value: string) {
    //console.log(value); recoge el valor del select seleccionado
    this.selectionType = value;
  }

  filterChanged(value: string) {
    if (value === '') {
      this.getEmployees();

      return;
    }

    let filteredEmployees = [];
    if (this.selectionType === 'name') {
      filteredEmployees = this.employees.filter(e =>
        e.nombre.toLowerCase().includes(value.toLowerCase())
      );
    } else if (this.selectionType === 'lastname') {
      filteredEmployees = this.employees.filter(e =>
        e.apellidos.toLowerCase().includes(value.toLowerCase())
      );
    } else if (this.selectionType === 'email') {
      filteredEmployees = this.employees.filter(e =>
        e.email.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      filteredEmployees = [];
    }

    this.employees = filteredEmployees;
  }
}
