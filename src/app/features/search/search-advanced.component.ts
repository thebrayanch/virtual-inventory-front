import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';
import { ProductsService, type SearchFilters } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { CartService } from '../../services/cart.service';
import type { Product } from '../../models/product.model';
import type { Category } from '../../models/category.model';

@Component({
  selector: 'app-search-advanced',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ButtonModule, InputTextModule, SelectModule, InputNumberModule, TagModule],
  templateUrl: './search-advanced.component.html',
  styleUrl: './search-advanced.component.css',
})
export class SearchAdvancedComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);

  categories = signal<Category[]>([]);
  results = signal<Product[]>([]);
  searched = signal(false);
  loading = signal(false);

  filters: SearchFilters = {
    query: '',
    categoryId: undefined,
    priceMin: undefined,
    priceMax: undefined,
    sortBy: 'price',
    sortOrder: 'asc',
  };

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe({
      next: (data) => this.categories.set(data),
    });
  }

  search(): void {
    this.loading.set(true);
    this.searched.set(true);

    this.productsService.searchAdvanced(this.filters).subscribe({
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
