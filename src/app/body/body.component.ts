import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  router: any;
  goToEmployees() {
    this.router.nagivate(['empleados']);
  }
}
