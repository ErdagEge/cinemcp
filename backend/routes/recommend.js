const express = require("express");
const router = express.Router();
const { fetchPopularSciFiMovies } = require("../services/tmdb");
const { buildMCPContext } = require("../services/mcp");
const { getMovieRecommendation } = require("../services/openai");

router.post("/", async (req, res) => {
  const { genres = [], dislikes = [], languages = [], mood = "neutral" } = req.body;
  const preferences = { genres, dislikes, languages, mood };

  try {
    const movies = await fetchPopularSciFiMovies(); // later: fetch by genres
    const context = buildMCPContext(preferences, movies);
    let recommendation;

    if (process.env.OPENAI_API_KEY) {
      try {
        recommendation = await getMovieRecommendation(context);
      } catch (err) {
        console.error("OpenAI request failed, using mock recommendation:", err.message);
        recommendation = "Based on your preferences, watch Dune and Dune: Part 2.";
      }
    } else {
      recommendation = "Based on your preferences, watch Dune and Dune: Part 2.";
    }

    res.json({ recommendation, movies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
