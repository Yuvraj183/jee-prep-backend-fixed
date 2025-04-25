const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'https://jee-prep-frontend.vercel.app' }));
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

app.post('/solve', async (req, res) => {
  const { doubt } = req.body;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Explain the following concept in simple terms: ${doubt}`,
      max_tokens: 150,
      temperature: 0.7
    });
    res.json({ explanation: completion.data.choices[0].text.trim() });
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
