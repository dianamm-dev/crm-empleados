import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      LoginComponent.strongPasswordValidator
    ])
  });

  isSubmitting: any;

  static strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);
    const isValidLength = value.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength
      ? null
      : { strongPassword: true };
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;

      this.authService.login(this.form.value).subscribe(
        (response: any) => {
          alert('✅ Inicio de sesión exitoso. Serás redirigido al dashboard.');
          this.form.reset();
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          alert('❌ Error en el inicio de sesión. Verifica tus credenciales.');
          console.error('Error:', error);
        },
        () => {
          setTimeout(() => {
            this.isSubmitting = false;
          });
        }
      );
    }
  }
}
