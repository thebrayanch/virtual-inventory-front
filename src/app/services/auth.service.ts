import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth_token';

export interface JwtPayload {
  sub?: string;
  email?: string;
  name?: string;
  iat?: number;
  exp?: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = this.decode(token);
      if (!payload) return false;
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        this.logout();
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  getCurrentUser(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
    return this.decode(token);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  private decode(token: string): JwtPayload | null {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }
}
