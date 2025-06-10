const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

// registering the user
const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

// registering the recommend route
const recommendRoutes = require("./routes/recommend");
app.use("/api/recommend", recommendRoutes);

app.use(cors());
app.use(express.json());

// Routes
const movieRoutes = require("./routes/movie");
app.use("/api/movies", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
