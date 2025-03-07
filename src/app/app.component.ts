import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeePageComponent } from '../components/employee-page/employee-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmployeePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crm-empleados';
}
