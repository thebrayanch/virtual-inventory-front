import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

const USER_KEY = 'current_user';

export interface UserData {
  id: number;
  userName: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);

  setUser(user: UserData): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): UserData | null {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  getCurrentUser(): UserData | null {
    return this.getUser();
  }

  logout(): void {
    localStorage.removeItem(USER_KEY);
    this.router.navigate(['/login']);
  }
}
