export interface AgentPlan {

  goal: string;

  steps: AgentPlanStep[];

}

export interface AgentPlanStep {

  id: number;

  name: string;

  description: string;

  tool: string;

  status: 'Pending' | 'Running' | 'Completed';

}