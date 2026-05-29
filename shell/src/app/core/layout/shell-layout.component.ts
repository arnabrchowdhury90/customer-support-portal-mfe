import { CommonModule, NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService, PermissionService } from '@customer-support-portal/auth';
import { PermissionScope, UserRole } from '@customer-support-portal/models';
import { TagModule } from 'primeng/tag';

interface NavItem {
  label: string;
  route: string;
  icon: string;
  permissions?: PermissionScope[];
  roles?: UserRole[];
}

@Component({
  standalone: true,
  selector: 'app-shell-layout',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NgClass, TagModule],
  templateUrl: './shell-layout.component.html',
  styleUrl: './shell-layout.component.scss',
})
export class ShellLayoutComponent {
  private readonly authService = inject(AuthService);
  private readonly permissionService = inject(PermissionService);
  private readonly router = inject(Router);

  // Current logged-in user comes from the auth signal
  readonly user = this.authService.user;

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'pi pi-home' },
    { label: 'Customers', route: '/customers', icon: 'pi pi-users', permissions: ['customer.read'] },
    { label: 'Analytics', route: '/analytics', icon: 'pi pi-chart-bar', permissions: ['analytics.view'] },
    { label: 'Admin', route: '/admin', icon: 'pi pi-cog', permissions: ['admin.manage'], roles: ['admin'] },
  ];

  readonly visibleNavItems = computed(() => {
    const currentUser = this.user();

    if (!currentUser) {
      return [];
    }

    return this.navItems.filter((item) => {
      const roleAllowed = this.permissionService.hasRole(item.roles ?? [], currentUser.role);
      const scopeAllowed = this.permissionService.hasAll(item.permissions ?? [], currentUser.scopes);

      return roleAllowed && scopeAllowed;
    });
  });

  readonly roleLabel = computed(() => {
    const role = this.user()?.role;
    return role ? role.replace('-', ' ') : 'Guest';
  });

  logout(): void {
    // Clear the demo session and go back to login
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  initials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0] ?? '')
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
}