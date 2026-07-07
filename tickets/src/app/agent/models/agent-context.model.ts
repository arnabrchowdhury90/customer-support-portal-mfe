import { AgentWorkflow } from './agent-workflow.model';
import { AgentDecision } from './agent-decision.model';

export interface AgentContext {

  ticket: unknown;

  workflow?: AgentWorkflow;

  knowledge?: string;

  toolResults?: Record<string, unknown>;

  decision?: AgentDecision;

  executionLog: string[];

  onStep?: (message: string) => void;

}