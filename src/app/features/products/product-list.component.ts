import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import type { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, TagModule, DialogModule, DividerModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  products = signal<Product[]>([]);
  selectedProduct = signal<Product | null>(null);
  showDetail = false;
  loading = signal(true);

  ngOnInit(): void {
    this.productsService.getAll().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  openDetail(product: Product): void {
    this.selectedProduct.set(product);
    this.showDetail = true;
  }

  addToCart(product: Product): void {
    this.cartService.addItem(product, 1);
  }
}
