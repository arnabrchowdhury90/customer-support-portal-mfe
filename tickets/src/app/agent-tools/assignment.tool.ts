import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class AssignmentTool {
    assignTeam(category: string): string {
        switch (category) {
            case 'Payment':
                return 'Finance Team';
            case 'Authentication':
                return 'Support Team';
            case 'Logistics':
                return 'Logistics Team';
            default:
                return 'Customer Care';
        }
    }
}
