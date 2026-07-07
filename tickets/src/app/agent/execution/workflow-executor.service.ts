import { Injectable, inject } from '@angular/core';

import { AgentContext } from '../models/agent-context.model';
import { KnowledgeLoaderService } from '../services/knowledge-loader.service';
import { SimilarityTool } from '../tools/similarity.tool';

@Injectable({
  providedIn: 'root'
})
export class WorkflowExecutorService {

  private readonly knowledgeLoader =
    inject(KnowledgeLoaderService);

  private readonly similarityTool =
    inject(SimilarityTool);

  async execute(
    context: AgentContext
  ): Promise<AgentContext> {

    context.executionLog.push(
      'Workflow execution started'
    );

    context.onStep?.(
      '🚀 Workflow execution started'
    );

    if (!context.workflow) {
      return context;
    }

    for (const step of context.workflow.steps) {

      step.status = 'Running';

      switch (step.type) {

        case 'knowledge': {

          context.onStep?.(
            `📚 Loading ${step.target}`
          );

          const knowledge =
            await this.knowledgeLoader.load(
              step.target
            );

          context.executionLog.push(
            `Loaded knowledge: ${step.target}`
          );

          console.log(
            `Knowledge (${step.target})`,
            knowledge
          );

          break;

        }

        case 'tool': {

          if (step.target === 'SimilarityTool') {

            context.onStep?.(
              '🔍 Executing Similarity Tool'
            );

            const result =
              this.similarityTool.execute(
                context.ticket
              );

            context.toolResults ??= {};

            context.toolResults[
              'SimilarityTool'
            ] = result;

            console.log(
              'Similarity Tool Result',
              result
            );

            context.executionLog.push(
              'Similarity Tool executed'
            );

          }

          break;

        }

        case 'action': {

          context.onStep?.(
            `⚙️ ${step.description}`
          );

          context.executionLog.push(
            `Executing action: ${step.target}`
          );

          break;

        }

      }

      step.status = 'Completed';

      context.onStep?.(
        `✅ ${step.description}`
      );

    }

    context.executionLog.push(
      'Workflow execution completed'
    );

    context.onStep?.(
      '🎉 Workflow completed'
    );

    return context;

  }

}