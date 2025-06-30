const { buildMCPContext } = require('../backend/services/mcp');
const { fetchMoviesByGenres } = require('../backend/services/tmdb');

describe('buildMCPContext', () => {
  test('builds context string with preferences and movie list', () => {
    const prefs = {
      genres: ['Sci-Fi'],
      dislikes: ['Horror'],
      languages: ['English'],
      mood: 'excited',
    };
    const movies = [
      {
        title: 'The Matrix',
        release_date: '1999-03-31',
        overview: 'A hacker learns about his reality.'
      }
    ];
    const context = buildMCPContext(prefs, movies);
    expect(context).toContain('[MCP v1.0]');
    expect(context).toContain('Likes: Sci-Fi');
    expect(context).toContain('Dislikes: Horror');
    expect(context).toContain('Languages: English');
    expect(context).toContain('Mood: excited');
    expect(context).toContain('- The Matrix (1999-03-31)');
  });
});

describe('fetchMoviesByGenres', () => {
  test('returns fallback movies when no API key present', async () => {
    const movies = await fetchMoviesByGenres(['Sci-Fi'], [], 'vote_average.desc', 1990);
    expect(Array.isArray(movies)).toBe(true);
    expect(movies.length).toBeGreaterThan(0);
    const titles = movies.map(m => m.title);
    expect(titles).toContain('Interstellar');
  });
});
