export interface AiResponse {

  category: string;

  priority: string;

  assignedTeam: string;

  confidence: number;

  similarTickets: string[];

  knowledgeUsed: string[];

  workflow: string[];

  rootCause: string;

  resolution: string[];

  escalation: boolean;

  aiRecommendation: string;

  executionTime: number;

}