import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';
@Injectable({
 providedIn: 'root'
})
export class TicketService {
 private readonly http = inject(HttpClient);
 // Get tickets from local json
 getTickets(): Observable<Ticket[]> {
   return this.http.get<Ticket[]>(
     'assets/tickets.json'
   );
 }
}