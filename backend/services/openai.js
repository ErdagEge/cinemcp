const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getMovieRecommendation(prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful movie recommendation assistant." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 300
  });

  return response.choices[0].message.content;
}

module.exports = { getMovieRecommendation };
