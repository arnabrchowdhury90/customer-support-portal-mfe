import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TicketStore } from '../../store/ticket.store';

@Component({
  standalone: true,
  selector: 'app-ticket-list',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    InputTextModule,
    SelectModule
  ],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss'
})

export class TicketListComponent {
  readonly store = inject(TicketStore);
  readonly statusOptions = [
    { label: 'All', value: 'All' },
    { label: 'Open', value: 'Open' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Closed', value: 'Closed' }
  ];

  constructor() {
    // Load tickets when component opens
    this.store.loadTickets();
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.store.updateSearch(value);
  }
  
  onStatusChange(status: string) {
    this.store.updateStatus(status);
  }
}
 