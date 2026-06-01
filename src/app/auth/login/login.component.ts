import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { LoginService } from './services';
import type { LoginRequest } from './models';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ButtonModule, InputTextModule, PasswordModule, MessageModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly loginService = inject(LoginService);
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

        if (res.success) {
          void this.router.navigate(['/']);
        } else {
          this.error = res.message;
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Error de conexión con el servidor';
      },
    });
  }
}
