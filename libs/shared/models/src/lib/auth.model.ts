// User roles used across the app
export type UserRole = 'admin' | 'team-lead' | 'support-agent' | 'viewer';

// Fine-grained access scopes
export type PermissionScope =
  | 'ticket.read'
  | 'ticket.create'
  | 'ticket.update'
  | 'ticket.assign'
  | 'ticket.close'
  | 'customer.read'
  | 'customer.update'
  | 'agent.manage'
  | 'analytics.view'
  | 'admin.manage';

// Basic user shape for auth/session state
export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  scopes: PermissionScope[];
}

// Payload from the login screen
export interface LoginRequest {
  displayName: string;
  role: UserRole;
}

// Session saved in localStorage
export interface AuthSession {
  token: string;
  issuedAt: string;
  expiresAt: string;
  user: AppUser;
}

// Role to scope mapping
export const ROLE_PERMISSION_MATRIX: Record<UserRole, PermissionScope[]> = {
  admin: [
    'ticket.read',
    'ticket.create',
    'ticket.update',
    'ticket.assign',
    'ticket.close',
    'customer.read',
    'customer.update',
    'agent.manage',
    'analytics.view',
    'admin.manage',
  ],
  'team-lead': [
    'ticket.read',
    'ticket.create',
    'ticket.update',
    'ticket.assign',
    'ticket.close',
    'customer.read',
    'customer.update',
    'analytics.view',
  ],
  'support-agent': [
    'ticket.read',
    'ticket.create',
    'ticket.update',
    'ticket.close',
    'customer.read',
  ],
  viewer: ['ticket.read', 'customer.read', 'analytics.view'],
};