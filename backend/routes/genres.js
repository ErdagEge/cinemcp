const express = require('express');
const router = express.Router();
const { fetchGenres } = require('../services/tmdb');

router.get('/', async (req, res) => {
  try {
    const genres = await fetchGenres();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

module.exports = router;
