require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function getModel() {
    return genAI.getGenerativeModel({
        model: 'gemini-2.5-flash'
    });
}

/* ============================
   Knowledge API
============================ */

app.get('/knowledge/:name', (req, res) => {

    try {

        const filePath = path.join(
            __dirname,
            'knowledge',
            `${req.params.name}.md`
        );

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: 'Knowledge file not found'
            });
        }

        const content = fs.readFileSync(filePath, 'utf8');

        res.json({
            success: true,
            content
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});

/* ============================
   Enterprise Agent
============================ */

app.post('/analyze', async (req, res) => {

    try {

        const { subject, description } = req.body;

        const prompt = `
You are an Enterprise AI Agent.

You have access to the following knowledge sources:

- authentication-policy
- payment-policy
- customer-support-policy
- sla-policy
- team-directory

You have access to the following tools:

- SimilarityTool

Analyze the ticket.

Decide:

1. Which knowledge files should be used.
2. Which tools should be executed.
3. Category.
4. Priority.
5. Assigned Team.
6. Root Cause.
7. Resolution.
8. Escalation.
9. Confidence.

Ticket Subject:
${subject}

Ticket Description:
${description}

Return ONLY valid JSON.

{
  "workflow": {
    "goal": "",
    "steps": [
      {
        "id": 1,
        "type": "knowledge",
        "target": "",
        "description": ""
      },
      {
        "id": 2,
        "type": "tool",
        "target": "",
        "description": ""
      },
      {
        "id": 3,
        "type": "action",
        "target": "",
        "description": ""
      }
    ]
  },
  "decision": {
    "category": "",
    "priority": "",
    "assignedTeam": "",
    "confidence": 0,
    "rootCause": "",
    "resolution": [
      ""
    ],
    "escalation": false,
    "reasoning": ""
  }
}

Return JSON only.
Do not wrap in markdown.
Do not explain anything.
`;

        const result = await getModel().generateContent(prompt);

        const response = result.response.text();

        res.json({
            success: true,
            agentResponse: response
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});

app.listen(3000, () => {

    console.log('BFF running on http://localhost:3000');

});