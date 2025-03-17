import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  private router: Router = inject(Router);

  goToEmployees() {
    this.router.navigate(['/empleados']);
  }
}
