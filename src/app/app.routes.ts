import { Routes } from '@angular/router';
import { CompraArticuloComponent } from './components/compra-articulo/compra-articulo.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'compra/101',
    pathMatch: 'full',
  },
  {
    path: 'compra/:id',
    component: CompraArticuloComponent,
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then((c) => c.RegisterComponent),
  },
];
