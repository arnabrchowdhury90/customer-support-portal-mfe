import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@customer-support-portal/auth';
import { UserRole } from '@customer-support-portal/models';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    SelectModule,
    InputTextModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly roles: { label: string; value: UserRole }[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'Team Lead', value: 'team-lead' },
    { label: 'Support Agent', value: 'support-agent' },
    { label: 'Viewer', value: 'viewer' },
  ];

  readonly form = this.fb.nonNullable.group({
    displayName: ['Arnab', [Validators.required, Validators.minLength(2)]],
    role: ['support-agent' as UserRole, [Validators.required]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Demo login: create a session and go to the dashboard
    this.authService.login(this.form.getRawValue());
    this.router.navigateByUrl('/dashboard');
  }
}