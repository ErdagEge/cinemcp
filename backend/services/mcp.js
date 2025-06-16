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

Prompt: Based on the provided preferences, recommend 2 films. Return each one as:

1. Title (Year)
Brief paragraph describing the film, and why it matches the user’s taste. Keep it concise and personal.`;

  console.log("[MCP] Built context:\n", context);
  return context;
}

module.exports = { buildMCPContext };
