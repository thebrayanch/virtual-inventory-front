import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { LoginService } from './services/login.service';
import { AuthService } from '../../services/auth.service';
import type { LoginRequest } from './models/login-request.interface';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ButtonModule, InputTextModule, PasswordModule, MessageModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly loginService = inject(LoginService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  loading = false;
  error = '';

  submit(): void {
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Todos los campos son obligatorios';
      return;
    }

    this.loading = true;

    const request: LoginRequest = { email: this.email, password: this.password };

    this.loginService.execute(request).subscribe({
      next: (res) => {
        this.loading = false;
        this.authService.setToken(res.token);

        const redirect = this.router.parseUrl(this.router.url).queryParamMap.get('redirect');
        void this.router.navigateByUrl(redirect || '/');
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 401) {
          this.error = err.error?.message || 'Credenciales inválidas';
        } else {
          this.error = 'Error de conexión. Verifica que el servidor esté encendido.';
        }
      },
    });
  }
}
