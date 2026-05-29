import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { PermissionScope, UserRole } from '../../../models/src/lib/auth.model';
import { PermissionService } from './permission.service';

// Used for route-level access checks
export const permissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  const requiredPermissions = (route.data['permissions'] ?? []) as PermissionScope[];
  const allowedRoles = (route.data['roles'] ?? []) as UserRole[];

  if (permissionService.hasRole(allowedRoles) && permissionService.hasAll(requiredPermissions)) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};