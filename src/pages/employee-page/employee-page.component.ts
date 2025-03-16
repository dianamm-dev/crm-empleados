import { Component, inject, OnInit } from '@angular/core';
import { EmployeeCardComponent } from '../../components/employee-card/employee-card.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [EmployeeCardComponent, FilterComponent, PaginationComponent],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.css'
})
export class EmployeePageComponent implements OnInit {
  employeeService: EmployeeService = inject(EmployeeService);

  employees: any[] = [];
  filteredEmployees: any[] = [];

  selectionType: string = 'name';
  loading: boolean = true;
  error: string = '';

  resultNumber: number = 0;
  pageNumber: number = 0;

  ngOnInit(): void {
    this.loading = true;

    this.employeeService.getAllEmployees().subscribe({
      next: (response) => {
        // inicializo los dos arrays a la respuesta del servidor
        this.employees = this.filteredEmployees = response;
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

  clearFilter(value: boolean) {
    if (value) {
      this.filteredEmployees = this.employees; // reseteo el array de filtrados a la original
    }
  }

  typeChanged(value: string) {
    this.selectionType = value;
  }

  filterChanged(value: string) {
    let filteredEmployees = [];

    if (this.selectionType === 'name') {
      filteredEmployees = this.filteredEmployees.filter(e =>
        e.nombre.toLowerCase().includes(value.toLowerCase())
      );
    } else if (this.selectionType === 'lastname') {
      filteredEmployees = this.filteredEmployees.filter(e =>
        e.apellidos.toLowerCase().includes(value.toLowerCase())
      );
    } else if (this.selectionType === 'email') {
      filteredEmployees = this.filteredEmployees.filter(e =>
        e.email.toLowerCase().includes(value.toLowerCase())
      );
    } else if (this.selectionType === 'department') {
      filteredEmployees = this.filteredEmployees.filter(e =>
        e.departamento === value
      );
    } else {
      filteredEmployees = [];
    }

    this.filteredEmployees = filteredEmployees;
  }

  resultNumberChanged(value: number) {
    this.loading = true;

    this.resultNumber = value;
    this.filteredEmployees = this.filteredEmployees.slice(0, value);

    this.loading = false;
  }

  pageNumberChanged(value: number) {
    this.loading = true;

    this.pageNumber = value - 1; // obtener el número de página correcto para el slice

    const resultNumberInPage = this.pageNumber * this.resultNumber;
    this.filteredEmployees = this.filteredEmployees.slice(resultNumberInPage, resultNumberInPage + this.resultNumber);

    this.loading = false;
  }
}
