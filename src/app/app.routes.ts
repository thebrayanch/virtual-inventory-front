import { Routes } from '@angular/router';
import { CompraArticuloComponent } from './components/compra-articulo/compra-articulo.component';

export const routes: Routes = [
  { 
    path: 'compra/:id', 
    component: CompraArticuloComponent 
  },
  { 
    path: '', 
    redirectTo: 'compra/101', 
    pathMatch: 'full' 
  }
];
