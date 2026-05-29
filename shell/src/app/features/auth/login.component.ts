import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@customer-support-portal/auth';
import { UserRole } from '@customer-support-portal/models';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly roles: UserRole[] = [
    'admin',
    'team-lead',
    'support-agent',
    'viewer',
  ];

  readonly form = this.fb.nonNullable.group({
    displayName: ['Arnab', [Validators.required]],
    role: ['support-agent' as UserRole, [Validators.required]],
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    // Create demo session
    this.authService.login(this.form.getRawValue());

    this.router.navigateByUrl('/dashboard');
  }
}