import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-compra-articulo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compra-articulo.component.html',
  styleUrl: './compra-articulo.component.css'
})
export class CompraArticuloComponent implements OnInit {
  protected productoId = signal<string | null>(null);
  protected compraExitosa = signal<boolean>(false);

  protected datosPago = {
    nombreTitular: '',
    numeroTarjeta: '',
    expiracion: '',
    cvv: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productoId.set(this.route.snapshot.paramMap.get('id'));
  }

  protected procesarPago(formulario: NgForm): void {
    if (formulario.invalid) {
      return;
    }
    console.log('Procesando pago para el artículo ID:', this.productoId());
    this.compraExitosa.set(true);
    formulario.resetForm();
  }

  protected volverAlCatalogo(): void {
    this.router.navigate(['/']);
  }
}
