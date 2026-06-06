import { Routes } from '@angular/router';
import { CompraArticuloComponent } from './components/compra-articulo/compra-articulo.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'compra/:id',
    component: CompraArticuloComponent,
    canActivate: [authGuard],
  },
];
