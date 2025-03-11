import { Component, inject, OnInit } from '@angular/core';
import { EmployeeCardComponent } from '../../components/employee-card/employee-card.component';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [EmployeeCardComponent],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.css'
})
export class EmployeePageComponent implements OnInit {
  employeeService: EmployeeService = inject(EmployeeService);
  employees: any[] = [];
  loading: boolean = true;
  error: string = '';

  ngOnInit(): void {
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
}
