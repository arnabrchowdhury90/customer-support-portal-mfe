import { Route } from '@angular/router';
import { authGuard, guestOnlyGuard } from '@customer-support-portal/auth';

export const appRoutes: Route[] = [
  {
    // Login is only for guests
    path: 'login',
    canActivate: [guestOnlyGuard],
    loadComponent: () =>
      import('./features/auth/login.component').then((m) => m.LoginComponent),
  },
  {
    // Everything inside the shell needs a valid session
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layout/shell-layout.component').then(
        (m) => m.ShellLayoutComponent
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        // Host-owned landing page
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        // Microfrontend loaded at runtime
        path: 'analytics',
        loadChildren: () =>
          import('analytics/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('admin/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('customers/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: 'tickets',
        loadChildren: () =>
          import('tickets/Routes').then((m) => m!.remoteRoutes),
      },
    ],
  },
  {
    // Fallback route
    path: '**',
    redirectTo: 'login',
  },
];