import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { PermissionScope, UserRole } from '../../../models/src/lib/auth.model';

/**
 * Small helper service for role/scope checks.
 * Keeps permission logic out of components.
 */
@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private readonly authService = inject(AuthService);

  hasAll(required: PermissionScope[] = [], scopes = this.authService.scopes()): boolean {
    if (!required.length) {
      return true;
    }

    return required.every((scope) => scopes.includes(scope));
  }

  hasAny(required: PermissionScope[] = [], scopes = this.authService.scopes()): boolean {
    if (!required.length) {
      return true;
    }

    return required.some((scope) => scopes.includes(scope));
  }

  hasRole(allowedRoles: UserRole[] = [], role = this.authService.user()?.role ?? null): boolean {
    if (!allowedRoles.length) {
      return true;
    }

    return !!role && allowedRoles.includes(role);
  }
}