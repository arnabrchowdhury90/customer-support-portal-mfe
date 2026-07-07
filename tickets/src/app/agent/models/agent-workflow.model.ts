export interface AgentWorkflow {

  goal: string;

  steps: AgentWorkflowStep[];

}

export interface AgentWorkflowStep {

  id: number;

  type:
    | 'knowledge'
    | 'tool'
    | 'reason'
    | 'action';

  target: string;

  description: string;

  status:
    | 'Pending'
    | 'Running'
    | 'Completed'
    | 'Failed';

}