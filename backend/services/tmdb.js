const axios = require("axios");
require("dotenv").config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Minimal fallback dataset when an API key isn't provided or the request
// fails. This keeps development running without network credentials.
const FALLBACK_MOVIES = [
  {
    title: "Interstellar",
    release_date: "2014-11-05",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster_path: null,
    original_language: "en",
  },
  {
    title: "The Matrix",
    release_date: "1999-03-31",
    overview:
      "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    poster_path: null,
    original_language: "en",
  },
];

const FALLBACK_GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
];

async function fetchPopularSciFiMovies() {
  // If no API key is present, immediately return the fallback list
  if (!TMDB_API_KEY) {
    return FALLBACK_MOVIES;
  }

  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        sort_by: "popularity.desc",
        with_genres: 878, // Sci-Fi genre ID
        language: "en-US",
      },
    });

    return response.data.results.slice(0, 5); // Just the top 5 for now
  } catch (err) {
    // Network or API errors shouldn't prevent development use
    console.error("TMDB request failed, using fallback data:", err.message);
    return FALLBACK_MOVIES;
  }
}

async function fetchGenres() {
  if (!TMDB_API_KEY) {
    return FALLBACK_GENRES;
  }

  try {
    const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    return res.data.genres;
  } catch (err) {
    console.error("TMDB genres request failed, using fallback:", err.message);
    return FALLBACK_GENRES;
  }
}

module.exports = {
  fetchPopularSciFiMovies,
  fetchGenres
};
