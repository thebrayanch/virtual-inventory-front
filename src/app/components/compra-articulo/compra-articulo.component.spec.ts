import { TestBed } from '@angular/core/testing';
import { CompraArticuloComponent } from './compra-articulo.component';
import { provideRouter } from '@angular/router';

describe('CompraArticuloComponent - Pruebas Unitarias', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompraArticuloComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('Debería inicializar el módulo de compra correctamente', () => {
    const fixture = TestBed.createComponent(CompraArticuloComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
