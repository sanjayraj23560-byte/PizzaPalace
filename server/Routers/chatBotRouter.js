import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize the Google Gen AI client with your key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages array is required' });
        }

        // Convert client chat history format ({ role, content }) to Gemini format
        const contents = messages.map((m) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
        }));

        // Call the gemini-1.5-flash model
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-lite',
            contents: contents,
            config: {
                systemInstruction:
                    'You are Pizza Palace AI, a friendly assistant for Pizza Palace restaurant. Help users pick pizzas, drinks, and track their food orders.',
            },
        });
        // Send the response back to your React frontend
        res.json({ reply: response.text });
    } catch (error) {
        console.error('Gemini API Error:', error);

        // Graceful error handling for Rate Limits (429)
        if (error.status === 429) {
            return res.json({
                reply: "I'm taking a 12 Hour pizza break! Please try asking again in a few hours. 🍕",
            });
        }

        res.status(500).json({ error: 'Failed to fetch AI response' });
    }
});

export default router;