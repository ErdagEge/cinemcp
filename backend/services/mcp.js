function buildMCPContext(preferences, movieList) {
  const { genres = [], dislikes = [], languages = [], mood = "neutral" } = preferences;

  const context = `
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

  console.log("[MCP] Built context:\n", context);
  return context;
}

module.exports = { buildMCPContext };
