import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { RegisterService } from './services';
import type { RegisterRequest } from './models';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, ButtonModule, InputTextModule, PasswordModule, MessageModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly registerService = inject(RegisterService);
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

        if (res.success) {
          void this.router.navigate(['/login']);
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
