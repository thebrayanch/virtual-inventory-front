import { TestBed } from '@angular/core/testing';
import { SearchService, Product } from './search.service';
import { describe, it, expect, beforeEach } from 'vitest';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'iPhone 14',
    price: 999,
    category: 'smartphones',
    description: 'Apple phone',
    stock: 10,
  },
  {
    id: 2,
    title: 'Samsung Galaxy',
    price: 799,
    category: 'smartphones',
    description: 'Samsung phone',
    stock: 5,
  },
  {
    id: 3,
    title: 'Laptop Dell',
    price: 1200,
    category: 'laptops',
    description: 'Dell laptop',
    stock: 0,
  },
  {
    id: 4,
    title: 'Audífonos Sony',
    price: 150,
    category: 'audio',
    description: 'Sony headphones',
    stock: 20,
  },
];

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
    service.setProducts(mockProducts);
  });

  // --- Búsqueda básica ---
  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('búsqueda básica: retorna resultados por nombre', () => {
    const results = service.searchBasic('iPhone');
    expect(results.length).toBe(1);
    expect(results[0].title).toBe('iPhone 14');
  });

  it('búsqueda básica: es case-insensitive', () => {
    const results = service.searchBasic('iphone');
    expect(results.length).toBe(1);
  });

  it('búsqueda básica: query vacío retorna todos los productos', () => {
    const results = service.searchBasic('');
    expect(results.length).toBe(4);
  });

  it('búsqueda básica: query sin coincidencias retorna arreglo vacío', () => {
    const results = service.searchBasic('xyz123');
    expect(results.length).toBe(0);
  });

  // --- Búsqueda avanzada ---
  it('búsqueda avanzada: filtra por categoría', () => {
    const results = service.searchAdvanced({ category: 'smartphones' });
    expect(results.length).toBe(2);
  });

  it('búsqueda avanzada: filtra por precio mínimo', () => {
    const results = service.searchAdvanced({ minPrice: 800 });
    expect(results.length).toBe(2);
  });

  it('búsqueda avanzada: filtra por precio máximo', () => {
    const results = service.searchAdvanced({ maxPrice: 200 });
    expect(results.length).toBe(1);
    expect(results[0].title).toBe('Audífonos Sony');
  });

  it('búsqueda avanzada: filtra por rango de precio', () => {
    const results = service.searchAdvanced({ minPrice: 500, maxPrice: 1000 });
    expect(results.length).toBe(2);
  });

  it('búsqueda avanzada: filtra solo productos en stock', () => {
    const results = service.searchAdvanced({ inStock: true });
    expect(results.length).toBe(3);
  });

  it('búsqueda avanzada: combina nombre y categoría', () => {
    const results = service.searchAdvanced({ name: 'Samsung', category: 'smartphones' });
    expect(results.length).toBe(1);
    expect(results[0].title).toBe('Samsung Galaxy');
  });
});
