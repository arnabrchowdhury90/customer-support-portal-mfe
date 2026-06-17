export type TicketStatus =
    | 'Open'
    | 'In Progress'
    | 'Closed';
export type TicketPriority =
    | 'High'
    | 'Medium'
    | 'Low';
export interface Ticket {
    id: string;
    subject: string;
    customer: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    assignee: string;
    createdAt: string;
}