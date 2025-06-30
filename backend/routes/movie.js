const express = require("express");
const router = express.Router();
const { fetchMoviesByGenres } = require("../services/tmdb");

router.post("/by-genres", async (req, res) => {
  const {
    genres = [],
    languages = [],
    sort = "popularity.desc",
    minYear,
  } = req.body;
  try {
    const movies = await fetchMoviesByGenres(genres, languages, sort, minYear);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies." });
  }
});

module.exports = router;
