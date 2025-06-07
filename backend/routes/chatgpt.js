const express = require('express');
const router = express.Router();
const { Configuration, OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/feedback', async(req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: "Missing content"});
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { 
                    role: "developer", 
                    content: 'You are a helpful screenplay writing assistant. As briefly as possible, provide constructive feedback on how to improve the following screenplay excerpt, focusing on clear characterization, plot, and pacing.'
                },
                {
                    role: 'user',
                    content,
                },
            ],
            model: "gpt-4.1-mini",
        });

        const feedback = completion.choices[0].message.content
        res.json({feedback})
    } catch (error) {
        console.error("OpenAI error:", error);
        res.status(500).json({error: 'Failed to get feedback from GPT' })
    }
})

module.exports = router;