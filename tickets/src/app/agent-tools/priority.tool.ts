import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class PriorityTool {
    assignPriority(
        subject: string,
        description: string
    ): string {
        const text = `${subject} ${description}`.toLowerCase();
        if (
            text.includes('payment failed') ||
            text.includes('charged twice') ||
            text.includes('cannot login') ||
            text.includes('urgent')
        ) {
            return 'High';
        }
        if (
            text.includes('slow') ||
            text.includes('error') ||
            text.includes('issue')
        ) {
            return 'Medium';
        }
        return 'Low';
    }
}
