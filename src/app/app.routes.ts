import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductListComponent } from './features/products/product-list.component';
import { SearchBasicComponent } from './features/search/search-basic.component';
import { SearchAdvancedComponent } from './features/search/search-advanced.component';
import { CartComponent } from './features/cart/cart.component';
import { CompraArticuloComponent } from './components/compra-articulo/compra-articulo.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'articulos', pathMatch: 'full' },
      { path: 'articulos', component: ProductListComponent },
      { path: 'busqueda', component: SearchBasicComponent },
      { path: 'busqueda/avanzada', component: SearchAdvancedComponent },
      { path: 'carrito', component: CartComponent },
      { path: 'compra/:id', component: CompraArticuloComponent },
    ],
  },
];
