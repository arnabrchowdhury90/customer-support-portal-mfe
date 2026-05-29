import { computed, Injectable, signal } from '@angular/core';
import {
  AppUser,
  AuthSession,
  LoginRequest,
  ROLE_PERMISSION_MATRIX,
  UserRole,
} from '../../../models/src/lib/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Persist auth state across refreshes
  private readonly storageKey = 'csp.auth.session';

  // Single source of truth for auth state
  private readonly sessionSignal = signal<AuthSession | null>(
    this.readSession()
  );

  // Expose read-only signals to consumers
  readonly session = this.sessionSignal.asReadonly();
  readonly user = computed(() => this.sessionSignal()?.user ?? null);
  readonly isAuthenticated = computed(() => !!this.sessionSignal());
  readonly scopes = computed(() => this.sessionSignal()?.user.scopes ?? []);

  login(request: LoginRequest): AuthSession {
    const now = new Date();

    const session: AuthSession = {
      token: this.createToken(),
      issuedAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString(),
      user: {
        id: this.createUserId(request.displayName, request.role),
        name: request.displayName.trim(),
        email: this.createEmail(request.displayName, request.role),
        role: request.role,

        // Scopes come from the role-permission matrix
        scopes: ROLE_PERMISSION_MATRIX[request.role],
      },
    };

    // Update signal + local storage
    this.sessionSignal.set(session);
    this.writeSession(session);

    return session;
  }

  logout(): void {
    this.sessionSignal.set(null);
    localStorage.removeItem(this.storageKey);
  }

  // Rehydrate session after page refresh
  restoreSession(): AuthSession | null {
    const session = this.readSession();
    this.sessionSignal.set(session);
    return session;
  }

  hasRole(role: UserRole): boolean {
    return this.user()?.role === role;
  }

  private readSession(): AuthSession | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const raw = localStorage.getItem(this.storageKey);

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }

  private writeSession(session: AuthSession): void {
    localStorage.setItem(this.storageKey, JSON.stringify(session));
  }

  // Mock token for demo purposes
  private createToken(): string {
    return globalThis.crypto?.randomUUID?.()
      ?? `tok_${Math.random().toString(36).slice(2)}`;
  }

  private createUserId(name: string, role: string): string {
    return `${role}_${name.trim().toLowerCase().replace(/\s+/g, '_')}`;
  }

  private createEmail(name: string, role: string): string {
    const normalized = name.trim().toLowerCase().replace(/\s+/g, '.');
    return `${normalized || 'user'}+${role}@support-demo.local`;
  }
}