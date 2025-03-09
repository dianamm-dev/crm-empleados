import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent {
  private employeeService: EmployeeService = inject(EmployeeService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      let employeeId = param['id'] as string;
      console.log(employeeId);
      //this.employeeService.getEmployeeById(employeeId)
    })
  }

}
