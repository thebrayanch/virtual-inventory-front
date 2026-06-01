import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { RegisterRequest, RegisterResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/auth';

  execute(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, data);
  }
}
