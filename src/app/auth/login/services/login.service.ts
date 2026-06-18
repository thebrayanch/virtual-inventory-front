import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import type { LoginRequest } from '../models/login-request.interface';
import type { LoginResponse } from '../models/login-response.interface';
import { API_URL } from '../../../models/api.url';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly http = inject(HttpClient);

  execute(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_URL}/auth/login`, data);
  }
}
