const express = require("express");
const router = express.Router();
const { fetchPopularSciFiMovies } = require("../services/tmdb");

router.get("/sci-fi", async (req, res) => {
  try {
    const movies = await fetchPopularSciFiMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies." });
  }
});

module.exports = router;
