import { Routes }         from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes =
[
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(dash => dash.DashboardComponent) }
];
