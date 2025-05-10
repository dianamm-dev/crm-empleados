import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  private router: Router = inject(Router);

  recoverPassword(method: string) {
    if (method === 'email') {
      alert('📧 Se enviará un código a tu correo electrónico.');
    } else if (method === 'sms') {
      alert('📱 Se enviará un código a tu teléfono vía SMS.');
    }
  }
}
