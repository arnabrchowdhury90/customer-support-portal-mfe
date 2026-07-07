import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TicketStore } from '../../store/ticket.store';
import { AiResponse } from '../../models/ai-response.model';
import { AiAgentService } from '../../services/ai-agent.service';
@Component({
  standalone: true,
  selector: 'app-ticket-details',
  imports: [
    CommonModule,
    RouterLink,
    CardModule,
    ButtonModule,
    TagModule
  ],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss'
})
export class TicketDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(TicketStore);
  readonly aiAgent = inject(AiAgentService);
  readonly aiResponse = signal<AiResponse | null>(null);
  // Ticket id from url
  readonly ticketId =
    this.route.snapshot.paramMap.get('id');
  // Get selected ticket
  readonly ticket = computed(() => {
    return this.store
      .tickets()
      .find(
        t => t.id === this.ticketId
      );
  });
    async analyzeTicket() {
    const ticket = this.ticket();
    if (!ticket) {
      return;
    }
    const result = await this.aiAgent.analyzeTicket(
      ticket,
      this.store.tickets()
    );
    this.aiResponse.set(result);
    }
}
