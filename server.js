const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'https://jee-prep-frontend.vercel.app' }));
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/solve', async (req, res) => {
  const { doubt } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You're a helpful tutor who explains concepts in simple terms." },
        { role: "user", content: `Explain this concept: ${doubt}` }
      ]
    });
    res.json({ explanation: completion.choices[0].message.content.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating explanation.' });
  }
});

app.get('/', (req, res) => {
  res.send('JEE Prep API is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
