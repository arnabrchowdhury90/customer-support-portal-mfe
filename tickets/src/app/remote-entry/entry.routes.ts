import { Route } from '@angular/router';
export const remoteRoutes: Route[] = [
    {
        path: '',
        loadComponent: () =>
            import('../features/ticket-list/ticket-list.component')
                .then(m => m.TicketListComponent)
    },
    {
        path:':id',
        loadComponent: () =>
            import('../features/ticket-details/ticket-details.component')
                .then(m => m.TicketDetailsComponent)
    }
];
