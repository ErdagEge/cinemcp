# CineMCP

**Smart Movie Recommender powered by Model Context Protocol (MCP)**

CineMCP is a movie recommendation web app that dynamically builds context-aware prompts for an LLM using user preferences, moods, and real-time movie data from TMDB. It demonstrates the use of a custom Model Context Protocol (MCP) to intelligently personalize each AI response.

---

## 🎯 Features

* Session-based preference input (genres, languages, dislikes, mood, popularity/rating, release date)
* Real-time recommendations without stored profiles
* TMDB API integration for real-time movie data
* MCP Context Assembler for rich, personalized prompts
* OpenAI integration for AI-powered suggestions
* Responsive frontend with glassmorphism style
* Modular Express backend with a `/api/genres` endpoint

---

## 🛠 Tech Stack

| Layer    | Technology               |
| -------- | ------------------------ |
| Frontend | HTML5, CSS3, JavaScript  |
| Backend  | Node.js, Express.js      |
| API      | TMDB, OpenAI             |
| Storage  | None (session-based) |

---

## 🚀 Getting Started

### 1. Clone and Setup

```bash
git clone https://github.com/ErdagEge/cinemcp.git
cd cinemcp
npm install
```

### 2. Create Environment Variables

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_key_here
TMDB_API_KEY=your_tmdb_key_here
```

Both keys are optional during development. If omitted, the server falls back to
sample movies and stubbed recommendations.

### 3. Run the Server

```bash
node backend/index.js
```

Visit your form UI:

* Open `frontend/index.html` directly in your browser

Or, serve it via Express (already configured in `index.js`):

* Visit: `http://localhost:3000`

---

## 🧪 Testing the API

Use the form to select your preferences, then test these routes:

```
POST http://localhost:3000/api/recommend

{
  "genres": ["Sci-Fi"],
  "dislikes": ["Horror"],
  "languages": ["English"],
  "mood": "chill"
}
```

You should see an assembled MCP prompt including your preferences and movie data.

Fetch the available genres:

```
GET http://localhost:3000/api/genres
```

Run the Jest test suite at any time with:

```bash
npm test
```
---

## 📁 Folder Structure

```
cinemcp/
├── backend/
│   ├── routes/
│   │   ├── movie.js            # POST /api/movies/by-genres - TMDB fetcher
│   │   ├── recommend.js        # POST /api/recommend - MCP assembler
│   │   └── genres.js           # GET /api/genres - available genres
│   ├── services/
│   │   ├── mcp.js              # Builds final context string for OpenAI
│   │   ├── tmdb.js             # TMDB API integration logic
│   │   └── openai.js           # OpenAI API handler
│   └── index.js                # Main server setup
│
├── frontend/
│   ├── index.html              # User input form
│   ├── app.js                  # Handles form submission
│   └── style.css               # Styling (optional)
│
├── .env                        # Environment variables (not committed)
├── .gitignore                  # Ignores node_modules, .env, etc.
├── package.json                # Node dependencies
└── README.md                   # Project overview
```


## 📦 Deployment

Once complete, you can deploy CineMCP on:

* **Render** or **Railway** for full-stack
* **Vercel** for frontend (backend separately)
* Set your `.env` variables on the platform

---

## 📬 Future Plans

* Improve AI prompts and recommendation quality
* Store watch history and add filters
* Persist data in a real DB (MongoDB or PostgreSQL)

---

## 📜 License

MIT License. Open to contributions!
