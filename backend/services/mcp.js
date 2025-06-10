const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, "../data/users.json");

function buildMCPContext(userName, userMood, movieList) {
  const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
  // find the user by name, case-insensitive and trimmed to avoid common
  // issues with user input
  const normalizedName = userName.trim().toLowerCase();
  const user = users.find(u => u.name.toLowerCase() === normalizedName);

  if (!user) throw new Error("User not found");

  return `
[MCP v1.0]
ROLE: Movie Recommendation Assistant

USER PROFILE:
- Name: ${user.name}
- Likes Genres: ${user.genres.join(", ")}
- Dislikes: ${user.dislikes.join(", ")}
- Languages: ${user.languages.join(", ")}

CURRENT MOOD: ${userMood}

MOVIE DATABASE:
${movieList.map(m => `- ${m.title} (${m.release_date}) — ${m.overview}`).join("\n")}

GOAL: Suggest 2 movies the user will enjoy based on their taste and mood.
`;
}

module.exports = { buildMCPContext };
