import { Injectable, inject } from '@angular/core';

import { Ticket } from '../models/ticket.model';
import { AiResponse } from '../models/ai-response.model';

import { AgentRuntimeService } from '../agent/services/agent-runtime.service';

@Injectable({
  providedIn: 'root'
})
export class AiAgentService {

  private readonly runtime =
    inject(AgentRuntimeService);

  async analyzeTicket(
    ticket: Ticket,
    allTickets: Ticket[],
    onStep?: (message: string) => void
  ): Promise<AiResponse> {

    const start = performance.now();

    const context: any =
      await this.runtime.execute(
        ticket,
        onStep
      );

    const end = performance.now();

    const decision = context.decision ?? {};

    const workflow =
      context.workflow?.steps?.map(
        (step: any) => step.description
      ) ?? [];

    const knowledgeUsed =
      context.workflow?.steps
        ?.filter((step: any) => step.type === 'knowledge')
        ?.map((step: any) => step.target) ?? [];

    return {

      category:
        decision.category ?? 'Unknown',

      priority:
        decision.priority ?? 'Unknown',

      assignedTeam:
        decision.assignedTeam ?? 'Unknown',

      confidence:
        Math.round((decision.confidence ?? 0) * 100),

      similarTickets:
        context.toolResults?.SimilarityTool ?? [],

      knowledgeUsed,

      workflow,

      rootCause:
        decision.rootCause ?? '',

      resolution:
        decision.resolution ?? [],

      escalation:
        decision.escalation ?? false,

      aiRecommendation:
        decision.reasoning ?? '',

      executionTime:
        Number((end - start).toFixed(0))

    };

  }

}