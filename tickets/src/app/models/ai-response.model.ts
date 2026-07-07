export interface AiResponse {
 category: string;
 priority: string;
 assignedTeam: string;
 similarTickets: string[];
 rootCause: string;
 resolution: string[];
 escalation: boolean;
 aiRecommendation: string;
}