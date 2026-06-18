import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../models/api.url';
import type { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_URL}/categories`);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${API_URL}/categories/${id}`);
  }
}
