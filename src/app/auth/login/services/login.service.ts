import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { LoginRequest, LoginResponse } from '../models';
import { API_URL } from 'src/app/models/api.url';

@Injectable({ providedIn: 'root' })
export class LoginService {;
  private readonly http = inject(HttpClient);

  execute(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_URL}/auth/login`, data);
  }
}
