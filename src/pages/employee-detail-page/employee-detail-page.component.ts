import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardDetailComponent } from "../../components/card-detail/card-detail.component";
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CardDetailComponent, CardDetailComponent],
  templateUrl: './employee-detail-page.component.html',
  styleUrl: './employee-detail-page.component.css'
})
export class EmployeeDetailPageComponent {
  private employeeService: EmployeeService = inject(EmployeeService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  employee: any;
  loading: boolean = true;
  error: string = '';

  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      const employeeId = param['id'] as string;
      console.log(employeeId);

      this.employeeService.getEmployeeById(employeeId).subscribe({
        next: (response) => {
          this.employee = response;
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
    })
  }

}
