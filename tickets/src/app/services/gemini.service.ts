import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class GeminiService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl =
        'http://localhost:3000/analyze';
    analyzeTicket(
        subject: string,
        description: string,
        category: string,
        priority: string,
        assignedTeam: string,
        similarTickets: string[]
    ) {
        return this.http.post<any>(
            this.apiUrl,
            {
                subject,
                description,
                category,
                priority,
                assignedTeam,
                similarTickets
            }
        );
    }
}
