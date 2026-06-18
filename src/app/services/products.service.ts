import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../models/api.url';
import type { Product } from '../models/product.model';

export interface SearchFilters {
  query?: string;
  categoryId?: number;
  priceMin?: number;
  priceMax?: number;
  sortBy?: 'price';
  sortOrder?: 'asc' | 'desc';
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/products`);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/${id}`);
  }

  searchByName(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/products`, {
      params: new HttpParams().set('productName_like', query),
    });
  }

  getByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/products`, {
      params: new HttpParams().set('idCategory', categoryId),
    });
  }

  searchAdvanced(filters: SearchFilters): Observable<Product[]> {
    let params = new HttpParams();

    if (filters.query) {
      params = params.set('productName_like', filters.query);
    }
    if (filters.categoryId) {
      params = params.set('idCategory', filters.categoryId);
    }
    if (filters.priceMin != null) {
      params = params.set('price_gte', filters.priceMin);
    }
    if (filters.priceMax != null) {
      params = params.set('price_lte', filters.priceMax);
    }
    if (filters.sortBy) {
      params = params.set('_sort', filters.sortBy);
      params = params.set('_order', filters.sortOrder ?? 'asc');
    }

    return this.http.get<Product[]>(`${API_URL}/products`, { params });
  }

  updateStock(id: number, stok: number): Observable<Product> {
    return this.http.patch<Product>(`${API_URL}/products/${id}`, { stok });
  }
}
