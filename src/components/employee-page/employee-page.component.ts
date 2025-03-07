import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';

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

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (newEmployees) => {
        this.employees = newEmployees;
      },
      error: (error) => {
        console.error('Error detectado:', error.error);
      },
    });
  }
}
