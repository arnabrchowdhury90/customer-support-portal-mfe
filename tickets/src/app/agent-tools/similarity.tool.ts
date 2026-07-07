import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.model';
@Injectable({
    providedIn: 'root'
})
export class SimilarityTool {
    findSimilarTickets(
        ticket: Ticket,
        tickets: Ticket[]
    ): string[] {
        const currentText =
            `${ticket.subject} ${ticket.description}`
                .toLowerCase();
        return tickets
            .filter(t => {
                if (t.id === ticket.id) {
                    return false;
                }
                const text =
                    `${t.subject} ${t.description}`
                        .toLowerCase();
                return (
                    currentText.includes('payment') &&
                    text.includes('payment')
                ) ||
                    (
                        currentText.includes('login') &&
                        text.includes('login')
                    ) ||
                    (
                        currentText.includes('refund') &&
                        text.includes('refund')
                    );
            })
            .slice(0, 3)
            .map(t => t.id);
    }
}
