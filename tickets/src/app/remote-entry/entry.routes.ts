import { Route } from '@angular/router';
export const remoteRoutes: Route[] = [
    {
        path: '',
        loadComponent: () =>
            import('../features/ticket-list/ticket-list.component')
                .then(m => m.TicketListComponent)
    }
];
