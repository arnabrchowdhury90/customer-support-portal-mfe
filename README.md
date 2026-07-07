# 🚀 Enterprise Agentic AI Customer Support Portal

An enterprise-grade Customer Support Portal built using **Angular Microfrontends (Nx + Module Federation)** that demonstrates how **Agentic AI** can autonomously analyze support tickets using enterprise knowledge, business tools, and LLM reasoning.

Unlike traditional chatbot integrations, this project implements an **AI Agent Runtime** capable of planning, executing, and reasoning over enterprise workflows.

---
## 🌟 Key Highlights

- 🤖 Agentic AI Runtime Architecture
- 🧠 Single LLM Call for Workflow Planning & Decision Generation
- 📚 Enterprise Knowledge Retrieval
- 🔧 Dynamic Tool Execution
- ⚡ Angular Microfrontends (Nx + Module Federation)
- 🔒 Secure Backend-for-Frontend (No API Keys in UI)
- 📊 Live AI Execution Dashboard
- 🏢 Enterprise-ready Modular Architecture

# System Architecture

```text
                            ┌──────────────────────────────┐
                            │        Angular Shell         │
                            └──────────────┬───────────────┘
                                           │
                                           ▼
                            ┌──────────────────────────────┐
                            │   Ticket Details Component   │
                            └──────────────┬───────────────┘
                                           │
                                           ▼
                            ┌──────────────────────────────┐
                            │      AI Agent Service        │
                            └──────────────┬───────────────┘
                                           │
                                           ▼
                            ┌──────────────────────────────┐
                            │     Agent Runtime Engine     │
                            └──────────────┬───────────────┘
                                           │
                              Single LLM Request
                                           │
                                           ▼
                         ┌──────────────────────────────────┐
                         │      Backend For Frontend        │
                         │          (Node/Express)          │
                         └──────────────┬───────────────────┘
                                        │
                                        ▼
                             Google Gemini 2.5 Flash
                                        │
                                        ▼
              ┌────────────────────────────────────────────────┐
              │ Workflow + AI Decision Generated Together      │
              └──────────────┬─────────────────────────────────┘
                             │
                             ▼
                    Workflow Executor
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
 Knowledge Loader      Similarity Tool     Future Tools
          │
          ▼
 Enterprise Knowledge Base
 (Markdown / RAG / SharePoint / Vector DB)
                             │
                             ▼
                     Final AI Recommendation
                             │
                             ▼
                      Angular Enterprise UI
```

---

# Sequence Diagram

```text
User
 │
 │ Click "Analyze with AI"
 ▼
Ticket Details Component
 │
 ▼
AI Agent Service
 │
 ▼
Agent Runtime
 │
 │─────────────────────────────────────►
 │        Backend For Frontend
 │
 │─────────────────────────────────────►
 │           Google Gemini
 │
 │◄─────────────────────────────────────
 │ Workflow + Decision
 │
 ▼
Workflow Executor
 │
 ├────────► Knowledge Loader
 │              │
 │              ▼
 │        Enterprise Policies
 │
 ├────────► Similarity Tool
 │              │
 │              ▼
 │      Similar Incident Search
 │
 ▼
Agent Context Updated
 │
 ▼
AI Agent Service
 │
 ▼
Ticket Details Component
 │
 ▼
Enterprise AI Dashboard
```

---

# Agent Runtime Flow

```text
                Ticket
                   │
                   ▼
      ┌─────────────────────┐
      │  Agent Runtime      │
      └─────────┬───────────┘
                │
                ▼
      Enterprise AI Planning
                │
                ▼
      Dynamic Workflow Created
                │
                ▼
      Execute Workflow Steps
                │
      ┌─────────┼─────────┐
      ▼         ▼         ▼
 Knowledge    Tools     Actions
      │         │         │
      └─────────┴─────────┘
                │
                ▼
         Runtime Context
                │
                ▼
        AI Structured Decision
                │
                ▼
         Enterprise Dashboard
```

---

# Project Layers

```text
┌───────────────────────────────────────┐
│             Angular UI                │
├───────────────────────────────────────┤
│          AI Agent Service             │
├───────────────────────────────────────┤
│         Agent Runtime Layer           │
├───────────────────────────────────────┤
│        Workflow Executor              │
├───────────────────────────────────────┤
│  Knowledge | Tools | Actions          │
├───────────────────────────────────────┤
│      Backend For Frontend             │
├───────────────────────────────────────┤
│        Google Gemini 2.5 Flash        │
└───────────────────────────────────────┘
```

---

# Enterprise AI Execution Pipeline

```text
Support Ticket
      │
      ▼
Agent Runtime Starts
      │
      ▼
Enterprise AI Plans Workflow
      │
      ▼
Knowledge Retrieval
      │
      ▼
Enterprise Tool Execution
      │
      ▼
AI Reasoning
      │
      ▼
Decision Generation
      │
      ▼
Enterprise Recommendation
      │
      ▼
Displayed to Support Engineer
```

# Agentic AI Workflow

When the user clicks **Analyze with AI**, the following sequence occurs:

```
User clicks Analyze

↓

Agent Runtime starts

↓

Enterprise AI generates execution workflow

↓

Workflow Executor executes each step

↓

Knowledge documents are loaded

↓

Enterprise tools are executed

↓

AI Decision is generated

↓

UI displays structured recommendation
```

Unlike a chatbot, the AI does **not** immediately answer the question.

Instead, it first decides **how** the problem should be solved.

---

# Project Structure

```
tickets
│
├── features
│     └── ticket-details
│
├── services
│     ├── ai-agent.service.ts
│     └── gemini.service.ts
│
├── agent
│     ├── execution
│     ├── services
│     ├── models
│     ├── tools
│     └── knowledge
│
└── store
```

---

# Agent Runtime Components

## 1. AI Agent Service

**File**

```
tickets/src/app/services/ai-agent.service.ts
```

Responsibilities

- Starts AI analysis
- Calls Agent Runtime
- Measures execution time
- Maps runtime output into UI model
- Returns structured AI response

---

## 2. Agent Runtime

**File**

```
tickets/src/app/agent/services/agent-runtime.service.ts
```

Responsibilities

- Creates Agent Context
- Calls Enterprise AI
- Receives workflow and decision
- Starts Workflow Executor
- Tracks runtime execution
- Sends live progress updates to UI

---

## 3. Workflow Executor

**File**

```
tickets/src/app/agent/execution/workflow-executor.service.ts
```

Responsibilities

Executes every workflow step generated by AI.

Supported step types:

- Knowledge
- Tool
- Action

Each completed step updates the runtime context.

---

## 4. Knowledge Loader

**File**

```
tickets/src/app/agent/services/knowledge-loader.service.ts
```

Responsibilities

Loads enterprise knowledge documents requested by AI.

Example:

- authentication-policy
- payment-policy
- customer-support-policy
- SLA policy
- Team directory

Knowledge is loaded dynamically rather than being embedded in prompts.

---

## 5. Similarity Tool

**File**

```
tickets/src/app/agent/tools/similarity.tool.ts
```

Responsibilities

Simulates an enterprise business tool.

Returns:

- Similar incidents
- Previous resolutions

The tool is executed only if requested by the AI-generated workflow.

---

## 6. Enterprise AI (BFF)

**Folder**

```
bff/
```

Responsibilities

Provides a Backend-for-Frontend layer.

Advantages

- Keeps API key secure
- Centralizes prompts
- Allows model replacement
- Enterprise architecture
- Prevents direct frontend access

Current Endpoint

```
POST /analyze
```

The endpoint performs a **single LLM call**.

Enterprise AI returns:

```
Workflow

+

Final Decision
```

---

# Knowledge Repository

```
bff/knowledge
```

Current documents

- authentication-policy.md
- customer-support-policy.md
- payment-policy.md
- sla-policy.md
- team-directory.md
- agent-system-prompt.md

This folder simulates an enterprise knowledge base.

In production it can be replaced by:

- SharePoint
- Azure AI Search
- Confluence
- Elastic Search
- Vector Database

---

# Agent Context

**File**

```
agent-context.model.ts
```

Maintains runtime state throughout execution.

Contains

- Ticket
- Workflow
- Knowledge
- Tool Results
- Decision
- Execution Log
- Runtime Progress Callback

Acts as shared memory for the AI Agent.

---

# AI Decision

Enterprise AI produces a structured response containing

- Category
- Priority
- Assigned Team
- Confidence Score
- Root Cause
- Resolution Steps
- Escalation Recommendation
- AI Reasoning

This structured output is rendered directly in the UI.

---

# Why This Is Agentic AI

Traditional AI

```
User

↓

Prompt

↓

LLM

↓

Answer
```

This project

```
User

↓

Agent Runtime

↓

Enterprise AI

↓

Workflow Planning

↓

Knowledge Retrieval

↓

Tool Execution

↓

Reasoning

↓

Decision

↓

UI
```

The AI autonomously decides

- Which knowledge to retrieve
- Which enterprise tools to execute
- The execution order
- The final recommendation

This demonstrates an **Agentic AI architecture** rather than a simple prompt-response chatbot.

---

# Technologies

- Angular
- Nx Monorepo
- Module Federation
- PrimeNG
- Angular Signals
- TypeScript
- Node.js
- Express
- Google Gemini API
- Agentic AI Runtime Pattern

---

# Current Features

- AI-powered ticket analysis
- Dynamic workflow generation
- Enterprise knowledge retrieval
- Business tool execution
- Structured AI decision
- Execution progress visualization
- Confidence scoring
- Secure Backend-for-Frontend architecture
- Single LLM call for planning and reasoning

---

# Future Enhancements

- Vector Database (RAG)
- Dynamic Tool Registry
- Multi-Agent Collaboration
- Human Approval Workflow
- Streaming Responses
- Persistent Agent Memory
- AI Observability Dashboard
- Tool Marketplace