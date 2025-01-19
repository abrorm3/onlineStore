import {Routes} from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {LoginComponent} from './login/login.component';
import {authGuard} from './login/auth/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductListComponent, canActivate: [authGuard]},
];
