const axios = require("axios");
require("dotenv").config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchPopularSciFiMovies() {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: TMDB_API_KEY,
      sort_by: "popularity.desc",
      with_genres: 878, // Sci-Fi genre ID
      language: "en-US"
    },
  });

  return response.data.results.slice(0, 5); // Just the top 5 for now
}

module.exports = {
  fetchPopularSciFiMovies
};
