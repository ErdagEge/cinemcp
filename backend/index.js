const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // This is **critical** for reading JSON body in POST

// Route setup
const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");
const recommendRoutes = require("./routes/recommend");

app.use("/api/user", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/recommend", recommendRoutes);

// (Optional) Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
