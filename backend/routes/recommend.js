const express = require("express");
const router = express.Router();
const { fetchPopularSciFiMovies } = require("../services/tmdb");
const { buildMCPContext } = require("../services/mcp");

router.get("/:name", async (req, res) => {
  const userName = req.params.name;
  const mood = req.query.mood || "neutral";

  try {
    const movies = await fetchPopularSciFiMovies();
    const context = buildMCPContext(userName, mood, movies);
    res.send(`<pre>${context}</pre>`);
  } catch (err) {
    res.status(500).send("Error building MCP prompt");
  }
});

module.exports = router;
