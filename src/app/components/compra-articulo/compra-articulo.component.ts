import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductsService } from '../../services/products.service';
import type { Product } from '../../models/product.model';

@Component({
  selector: 'app-compra-articulo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ButtonModule, InputTextModule, InputNumberModule],
  templateUrl: './compra-articulo.component.html',
  styleUrl: './compra-articulo.component.css',
})
export class CompraArticuloComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productsService = inject(ProductsService);

  product = signal<Product | null>(null);
  loading = signal(true);
  quantity = 1;
  compraExitosa = signal(false);
  processing = signal(false);

  datosPago = {
    nombreTitular: '',
    numeroTarjeta: '',
    expiracion: '',
    cvv: '',
  };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      void this.router.navigate(['/articulos']);
      return;
    }

    this.productsService.getById(id).subscribe({
      next: (data) => {
        this.product.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        void this.router.navigate(['/articulos']);
      },
    });
  }

  procesarPago(): void {
    const p = this.product();
    if (!p || this.processing()) return;

    if (this.quantity > p.stok) return;

    this.processing.set(true);

    this.productsService.updateStock(p.id, p.stok - this.quantity).subscribe({
      next: () => {
        this.product.set({ ...p, stok: p.stok - this.quantity });
        this.compraExitosa.set(true);
        this.processing.set(false);
      },
      error: () => {
        this.processing.set(false);
      },
    });
  }
}
