import { Injectable, signal } from '@angular/core';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  stock: number;
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  private products = signal<Product[]>([]);
  readonly results = signal<Product[]>([]);

  setProducts(products: Product[]) {
    this.products.set(products);
  }

  searchBasic(query: string): Product[] {
    if (!query.trim()) {
      this.results.set(this.products());
      return this.products();
    }
    const filtered = this.products().filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase()),
    );
    this.results.set(filtered);
    return filtered;
  }

  searchAdvanced(filters: {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
  }): Product[] {
    let filtered = this.products();
    if (filters.name)
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(filters.name!.toLowerCase()),
      );
    if (filters.category)
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === filters.category!.toLowerCase(),
      );
    if (filters.minPrice !== undefined)
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    if (filters.maxPrice !== undefined)
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    if (filters.inStock) filtered = filtered.filter((p) => p.stock > 0);
    this.results.set(filtered);
    return filtered;
  }
}
