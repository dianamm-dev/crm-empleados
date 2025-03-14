// 1️⃣ Genera el componente con:
// ng generate component components/password

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  constructor(private router: Router) {}

  recoverPassword(method: string) {
    if (method === 'email') {
      alert('📧 Se enviará un código a tu correo electrónico.');
    } else if (method === 'sms') {
      alert('📱 Se enviará un código a tu teléfono vía SMS.');
    }
  }
}
