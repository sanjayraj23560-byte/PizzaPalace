import dotenv from 'dotenv';
import { Router } from 'express';
import Groq from 'groq-sdk';

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const router = Router();

router.post('/', async (req, res) => {
    try {
        const { messages } = req.body;

        // 1. Keep history concise (last 6 messages)
        const recentMessages = messages.slice(-6);

        // 2. Format messages into Groq's expected OpenAI-style format
        const formattedMessages = [
            {
                role: 'system',
                content: 'You are pizzapalace AI, a helpful, enthusiastic pizza ordering assistant. Keep responses short, friendly, and focused on helping customers choose or order pizzas talk like gen-z , your name is Lisa.(dont write code )'
            },
            ...recentMessages.map(m => ({
                role: m.role === 'model' || m.role === 'assistant' ? 'assistant' : 'user',
                content: m.content
            }))
        ];

        // 3. Generate response using Llama 3.3 70B
        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: formattedMessages,
            max_tokens: 250,
            temperature: 0.7,
        });

        const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't process your pizza order right now.";

        res.json({ reply });
    } catch (error) {
        console.error('Groq API Error:', error);
        res.status(500).json({ error: 'AI Error' });
    }
});

export default router;