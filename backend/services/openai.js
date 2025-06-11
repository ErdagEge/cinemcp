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
    temperature: 0.8,
    max_tokens: 400
  });

  return response.choices[0].message.content;
}

module.exports = { getMovieRecommendation };
