const { OpenAI } = require("openai");
require("dotenv").config();

// Gracefully handle missing API key so development can run without OpenAI
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

async function getMovieRecommendation(prompt) {
  if (!openai) {
    // Return a simple mock response when no API key is configured
    return "Based on your preferences, watch Dune and Dune: Part 2.";
  }

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
