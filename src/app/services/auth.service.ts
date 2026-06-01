import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import type { User, LoginRequest, RegisterRequest, AuthResponse } from '../models';

const STORAGE_KEY = 'virtual_inventory_users';
const SESSION_KEY = 'virtual_inventory_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly seed$ = this.http.get<User[]>('assets/data/user/users.json');

  readonly seed = toSignal(this.seed$, { initialValue: [] as User[] });

  private getStored(): User[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private setStored(users: User[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  private getAll(): User[] {
    const stored = this.getStored();
    const seedVal = this.seed();
    const merged = [...seedVal];

    for (const user of stored) {
      const idx = merged.findIndex((u) => u.id === user.id);
      if (idx >= 0) {
        merged[idx] = user;
      } else {
        merged.push(user);
      }
    }

    return merged;
  }

  register(data: RegisterRequest): AuthResponse {
    const users = this.getStored();
    const exists = users.some((u) => u.email === data.email);

    if (exists) {
      return { success: false, message: 'El correo ya está registrado' };
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password: btoa(data.password),
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    this.setStored(users);

    const { password: _, ...safe } = newUser;
    return { success: true, message: 'Registro exitoso', user: safe };
  }

  login(data: LoginRequest): AuthResponse {
    const users = this.getAll();
    const user = users.find((u) => u.email === data.email && u.password === btoa(data.password));

    if (!user) {
      return { success: false, message: 'Credenciales inválidas' };
    }

    const { password: _, ...safe } = user;
    localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
    return { success: true, message: 'Inicio de sesión exitoso', user: safe };
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(SESSION_KEY) !== null;
  }

  getCurrentUser(): Omit<User, 'password'> | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
