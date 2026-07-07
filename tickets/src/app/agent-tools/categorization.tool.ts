import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CategorizationTool {
    categorize(subject: string, description: string): string {
        const text = `${subject} ${description}`.toLowerCase();
        if (
            text.includes('payment') ||
            text.includes('refund') ||
            text.includes('charged')
        ) {
            return 'Payment';
        }
        if (
            text.includes('login') ||
            text.includes('password') ||
            text.includes('authentication')
        ) {
            return 'Authentication';
        }
        if (
            text.includes('delivery') ||
            text.includes('shipment')
        ) {
            return 'Logistics';
        }
        return 'General Support';
    }
}
