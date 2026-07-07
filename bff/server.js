require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {
    GoogleGenerativeAI
} = require('@google/generative-ai');
const app = express();
app.use(cors());
app.use(express.json());
const genAI =
    new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
    );
app.post('/analyze', async (req, res) => {
    try {
        const {
            subject,
            description,
            category,
            priority,
            assignedTeam,
            similarTickets
        }
            = req.body;
        const model =
            genAI.getGenerativeModel({
                model: 'gemini-2.5-flash'
            });
        const prompt = `
You are an AI Support Agent.
Analyze the following support ticket.
Subject:
${subject}
Description:
${description}
Category:
${category}
Priority:
${priority}
Assigned Team:
${assignedTeam}
Similar Tickets:
${similarTickets.join(', ')}
Provide:
1. Root Cause
2. Resolution Steps
3. Escalation Advice
Keep it concise.
`;
        const result =
            await model.generateContent(prompt);
        const response =
            result.response.text();
        res.json({
            success: true,
            response
        });
    }
    catch (error) {
        console.error('======================');
        console.error('FULL GEMINI ERROR');
        console.error(error);
        console.error('MESSAGE:', error?.message);
        console.error('STACK:', error?.stack);
        console.error('CAUSE:', error?.cause);
        console.error('======================');
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
app.listen(3000, () => {
    console.log(
        'BFF running on http://localhost:3000'
    );
});
