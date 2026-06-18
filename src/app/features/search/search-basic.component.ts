import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import type { Product } from '../../models/product.model';

@Component({
  selector: 'app-search-basic',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ButtonModule, InputTextModule, TagModule],
  templateUrl: './search-basic.component.html',
  styleUrl: './search-basic.component.css',
})
export class SearchBasicComponent {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  query = '';
  results = signal<Product[]>([]);
  searched = signal(false);
  loading = signal(false);

  search(): void {
    const q = this.query.trim();
    if (!q) return;

    this.loading.set(true);
    this.searched.set(true);

    this.productsService.searchByName(q).subscribe({
      next: (data) => {
        this.results.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  addToCart(product: Product): void {
    this.cartService.addItem(product, 1);
  }
}
