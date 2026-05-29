import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '@customer-support-portal/auth';

@Component({
  standalone: true,
  selector: 'app-shell-layout',
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="shell">
      <aside class="shell__sidebar">
        <h2>🚀 Support Portal</h2>

        <nav>
          <a routerLink="/dashboard">Dashboard</a>
          <a routerLink="/tickets">Tickets</a>
          <a routerLink="/customers">Customers</a>
          <a routerLink="/analytics">Analytics</a>
          <a routerLink="/admin">Admin</a>
        </nav>
      </aside>

      <div class="shell__content">
        <header class="shell__topbar">
          <strong>Microfrontend Customer Support Portal</strong>

          <!-- Simple logout for the demo session -->
          <button type="button" class="shell__logout" (click)="logout()">
            Logout
          </button>
        </header>

        <main class="shell__main">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styleUrl: './shell-layout.component.scss',
})
export class ShellLayoutComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    // Clear the demo session and send the user back to login
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}