import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService, HasPermissionDirective } from '@customer-support-portal/auth';
import { PermissionScope } from '@customer-support-portal/models';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

interface DashboardStat {
  label: string;
  value: string;
  note: string;
  icon: string;
  accent: 'blue' | 'orange' | 'green' | 'purple';
}

interface DashboardAction {
  label: string;
  icon: string;
  route: string;
  permission: PermissionScope;
}

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, CardModule, ButtonModule, TagModule, HasPermissionDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  // Current signed-in user comes from the auth signal
  readonly authService = inject(AuthService);

  readonly stats: DashboardStat[] = [
    {
      label: 'Open Tickets',
      value: '128',
      note: 'Across all queues',
      icon: 'pi pi-ticket',
      accent: 'blue',
    },
    {
      label: 'SLA Risk',
      value: '14',
      note: 'Needs attention today',
      icon: 'pi pi-exclamation-triangle',
      accent: 'orange',
    },
    {
      label: 'Active Agents',
      value: '23',
      note: 'Online right now',
      icon: 'pi pi-users',
      accent: 'green',
    },
    {
      label: 'Escalations',
      value: '9',
      note: 'Waiting on review',
      icon: 'pi pi-chart-line',
      accent: 'purple',
    },
  ];

  readonly actions: DashboardAction[] = [
    { label: 'Open Tickets', icon: 'pi pi-ticket', route: '/tickets', permission: 'ticket.read' },
    { label: 'Customers', icon: 'pi pi-users', route: '/customers', permission: 'customer.read' },
    { label: 'Analytics', icon: 'pi pi-chart-bar', route: '/analytics', permission: 'analytics.view' },
    { label: 'Admin', icon: 'pi pi-cog', route: '/admin', permission: 'admin.manage' },
  ];
}