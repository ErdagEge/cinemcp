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


async function fetchGenres() {
  if (!TMDB_API_KEY) {
    console.log("[TMDB] No API key, using fallback genres");
    return FALLBACK_GENRES;
  }

  try {
    console.log("[TMDB] Fetching genre list");
    const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    console.log(`[TMDB] Retrieved ${res.data.genres.length} genres`);
    return res.data.genres;
  } catch (err) {
    console.error("TMDB genres request failed, using fallback:", err.message);
    return FALLBACK_GENRES;
  }
}

const LANGUAGE_CODE_MAP = {
  english: 'en',
  spanish: 'es',
  french: 'fr',
  german: 'de',
  japanese: 'ja',
  chinese: 'zh',
  hindi: 'hi',
  turkish: 'tr',
};

function mapLanguages(languages = []) {
  const codes = languages
    .map(l => LANGUAGE_CODE_MAP[l.toLowerCase()])
    .filter(Boolean);
  if (codes.length === 0) return undefined;
  // TMDB supports a single original language code, use the first selected
  return codes[0];
}

function filterFallbackMovies(languages = []) {
  const code = mapLanguages(languages);
  if (!code) return FALLBACK_MOVIES;
  const filtered = FALLBACK_MOVIES.filter(m => m.original_language === code);
  return filtered.length > 0 ? filtered : FALLBACK_MOVIES;
}

async function fetchMoviesByGenres(genreNames = [], languages = []) {
  if (genreNames.length === 0) {
    console.log("[TMDB] No genres specified, using fallback movies");
    return filterFallbackMovies(languages);
  }

  const genres = await fetchGenres();
  const nameMap = new Map(
    genres.map((g) => [g.name.toLowerCase(), g.id])
  );

  const ids = genreNames
    .map((name) => nameMap.get(name.toLowerCase()))
    .filter(Boolean);

  console.log("[TMDB] Resolved genres", genreNames, "->", ids);

  if (ids.length === 0) {
    console.log("[TMDB] No matching genre IDs found, using fallback movies");
    return FALLBACK_MOVIES;
  }

  if (!TMDB_API_KEY) {
    console.log("[TMDB] No API key, using fallback movies");
    return filterFallbackMovies(languages);
  }

  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        sort_by: "popularity.desc",
        with_genres: ids.join(","),
        language: "en-US",
        with_original_language: mapLanguages(languages),
      },
    });

    const results = response.data.results.slice(0, 4);
    console.log(`[TMDB] Retrieved ${results.length} movies`);
    return results;
  } catch (err) {
    console.error("TMDB request failed, using fallback data:", err.message);
    return FALLBACK_MOVIES;
  }
}

module.exports = {
  fetchGenres,
  fetchMoviesByGenres,
};
