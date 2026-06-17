import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Ticket } from '../models/ticket.model';
import { TicketService } from '../services/ticket.service';

type TicketState = {
    tickets: Ticket[];
    loading: boolean;
    searchTerm: string;
    statusFilter: string;
};

const initialState: TicketState = {
    tickets: [],
    loading: false,
    searchTerm: '',
    statusFilter: 'All'
};

export const TicketStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((store) => ({
        // Filter tickets based on search and status
        filteredTickets: computed(() => {
            return store.tickets().filter(ticket => {
                const matchesSearch =
                    ticket.subject
                        .toLowerCase()
                        .includes(store.searchTerm().toLowerCase());
                const matchesStatus =
                    store.statusFilter() === 'All' ||
                    ticket.status === store.statusFilter();
                return matchesSearch && matchesStatus;
            });
        })
    })),

    withMethods((store, ticketService = inject(TicketService)) => ({
        // Load tickets from json
        loadTickets() {
            patchState(store, {
                loading: true
            });

            ticketService.getTickets()
                .subscribe((tickets) => {
                    patchState(store, {
                        tickets,
                        loading: false
                    });
                });
        },

        updateSearch(search: string) {
            patchState(store, {
                searchTerm: search
            });
        },

        updateStatus(status: string) {
            patchState(store, {
                statusFilter: status
            });
        }
        
    }))
);
