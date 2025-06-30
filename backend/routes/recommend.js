const express = require("express");
const router = express.Router();
const { fetchMoviesByGenres } = require("../services/tmdb");
const { buildMCPContext } = require("../services/mcp");
const { getMovieRecommendation } = require("../services/openai");

router.post("/", async (req, res) => {
  const {
    genres = [],
    dislikes = [],
    languages = [],
    mood = "neutral",
    sort = "popularity.desc",
    minYear,
  } = req.body;
  const preferences = { genres, dislikes, languages, mood, sort, minYear };

  console.log("[Route] /api/recommend request:", preferences);

  try {
    let movies;
    if (genres.length === 0) {
      console.log("[Route] No genres provided, using fallback movies");
      movies = await fetchMoviesByGenres([], languages, sort, minYear);
    } else {
      movies = await fetchMoviesByGenres(genres, languages, sort, minYear);
    }
    const context = buildMCPContext(preferences, movies);
    console.log("[Route] Built MCP context for OpenAI");
    let recommendation;

    if (process.env.OPENAI_API_KEY) {
      try {
        recommendation = await getMovieRecommendation(context);
      } catch (err) {
        console.error("OpenAI request failed, using mock recommendation:", err.message);
        recommendation = "Based on your preferences, watch Dune and Dune: Part 2.";
      }
    } else {
      console.log("No API key was found.");
      recommendation = "Based on your preferences, watch Dune and Dune: Part 2.";
    }

    console.log("[Route] Recommendation result:", recommendation);

    res.json({ recommendation, movies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
