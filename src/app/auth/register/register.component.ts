import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { RegisterService } from './services';
import { AuthService } from '../../services/auth.service';
import type { RegisterRequest } from './models';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, ButtonModule, InputTextModule, PasswordModule, MessageModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly registerService = inject(RegisterService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  error = '';

  submit(): void {
    this.error = '';

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.error = 'Todos los campos son obligatorios';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    this.loading = true;

    const request: RegisterRequest = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.registerService.execute(request).subscribe({
      next: (res) => {
        this.loading = false;
        this.authService.setToken(res.token);
        void this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Error al registrar';
      },
    });
  }
}
