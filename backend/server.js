const express = require('express');
const OpenAI = require('openai');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors middleware

dotenv.config({ path: './.env' }); // Load environment variables from the root .env file

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Enable CORS for all origins (for development purposes).
// In a production environment, you would restrict this to specific origins.
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

app.post('/api/openai/chat', async (req, res) => {
    try {
        const messages = req.body.messages;
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Changed the model to gpt-3.5-turbo
            messages: messages,
        });
        res.json(response);
    } catch (error) {
        console.error('Error calling OpenAI:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});