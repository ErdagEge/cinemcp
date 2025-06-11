// Implemented OpenAI API handler
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getMovieRecommendation(prompt) {
  console.log("[OpenAI] Prompt:", prompt);
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful movie recommendation assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 400
    });

    console.log("[OpenAI] Raw response:", JSON.stringify(response));
    const recommendation = response.choices[0].message.content;
    console.log("[OpenAI] Recommendation:", recommendation);
    return recommendation;
  } catch (err) {
    console.error("[OpenAI] Error getting recommendation:", err.message);
    throw err;
  }
}

module.exports = { getMovieRecommendation };
