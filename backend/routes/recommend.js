const express = require("express");
const router = express.Router();
const { fetchPopularSciFiMovies } = require("../services/tmdb");
const { buildMCPContext } = require("../services/mcp");
const { getMovieRecommendation } = require("../services/openai");

router.get("/:name", async (req, res) => {
  const userName = req.params.name;
  const mood = req.query.mood || "neutral";

  try {
    const movies = await fetchPopularSciFiMovies(); // later: fetch by genres
    const context = buildMCPContext(userName, mood, movies);
    const recommendation = await getMovieRecommendation(context);

    res.json({ recommendation }); // return just the answer
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
