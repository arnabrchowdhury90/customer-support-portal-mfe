export interface AgentDecision {

  category: string;

  priority: string;

  assignedTeam: string;

  confidence: number;

  rootCause: string;

  resolution: string[];

  escalate: boolean;

  reasoning: string;

  actions: string[];

  similarTickets: string[];

}