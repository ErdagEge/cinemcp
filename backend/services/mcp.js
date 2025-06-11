function buildMCPContext(preferences, movieList) {
  const { genres = [], dislikes = [], languages = [], mood = "neutral" } = preferences;

  return `
[MCP v1.0]
USER PREFERENCES:
- Likes: ${genres.join(', ')}
- Dislikes: ${dislikes.join(', ')}
- Languages: ${languages.join(', ')}
- Mood: ${mood}

MOVIE DATABASE:
${movieList
  .map(m => `- ${m.title} (${m.release_date}) \u2014 ${m.overview}`)
  .join('\n')}

Prompt: Recommend 2 movies that match these preferences.`;
}

module.exports = { buildMCPContext };
