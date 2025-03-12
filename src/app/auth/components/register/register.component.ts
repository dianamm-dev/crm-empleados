import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      RegisterComponent.strongPasswordValidator
    ])
  });

  isSubmitting = false;

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
    console.log(this.form.valid);
    if (this.form.valid) {
      this.isSubmitting = true;
      this.authService.register(this.form.value).subscribe({
        next: (response: any) => {
          console.log('Response:', response);
          alert('✅ Registro exitoso. Serás redirigido al login.');
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          alert('❌ Error en el registro. Inténtalo de nuevo.');
          console.error('Error:', error);
        },
        complete: () => {
          setTimeout(() => {
            this.isSubmitting = false;
          }, 3000);
        }
      });
    }
  }
}
