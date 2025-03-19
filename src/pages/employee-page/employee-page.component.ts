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
  paginatedEmployees: any[] = [];

  selectionType: string = 'name';
  loading: boolean = true;
  error: string = '';

  pageNumber: number = 1;
  resultNumber: number = 0;
  resetFiltersTrigger: boolean = false;

  ngOnInit(): void {
    this.loading = true;

    this.employeeService.getAllEmployees().subscribe({
      next: (response) => {
        // inicializo los dos arrays a la respuesta del servidor
        this.employees = this.filteredEmployees = this.paginatedEmployees = response;
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
    this.selectionType = value;
  }

  clearFilter() {
    this.filteredEmployees = this.employees;
    this.selectionType = 'name';

    // cambia la variable de reseteo y después de un corto delay la vuelve a false
    this.resetFiltersTrigger = true;
    setTimeout(() => this.resetFiltersTrigger = false, 0);
  }

  filterChanged(value: string) {
    // reseteo el array de filtrados al array original
    this.filteredEmployees = this.employees;

    // aplicamos el filtro directamente al array de filtrados
    switch (this.selectionType) {
      case 'name':
        this.filteredEmployees = this.filteredEmployees.filter(e =>
          e.nombre.toLowerCase().includes(value.toLowerCase())
        );
        break;
      case 'lastname':
        this.filteredEmployees = this.filteredEmployees.filter(e =>
          e.apellidos.toLowerCase().includes(value.toLowerCase())
        );
        break;
      case 'email':
        this.filteredEmployees = this.filteredEmployees.filter(e =>
          e.apellidos.toLowerCase().includes(value.toLowerCase())
        );
        break;
      case 'department':
        this.filteredEmployees = this.filteredEmployees.filter(e =>
          e.departamento === value
        );
        break;
      default:
        this.filteredEmployees = [];
        break;
    }

    // recalculo la paginación
    this.resultNumberChanged(this.resultNumber);
    this.pageNumberChanged(1);
  }

  resultNumberChanged(value: number) {
    this.loading = true;

    // recogemos el nuevo valor del número de resultados
    this.resultNumber = value;

    // actualizamos el array de paginados
    this.updatePaginatedEmployees();

    this.loading = false;
  }

  pageNumberChanged(value: number) {
    this.loading = true;

    // recogemos el nuevo valor de la página seleccionada, menos 1 para el slice
    this.pageNumber = value - 1;

    // actualizamos el array de paginados
    this.updatePaginatedEmployees();

    this.loading = false;
  }

  updatePaginatedEmployees() {
    const startIndex = this.pageNumber * this.resultNumber;
    const endIndex = startIndex + this.resultNumber;

    this.paginatedEmployees = this.filteredEmployees.slice(startIndex, endIndex);
  }
}
