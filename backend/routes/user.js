const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, "../data/users.json");

router.post("/", (req, res) => {
  const user = req.body;

  let users = [];
  if (fs.existsSync(usersPath)) {
    users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
  }

  const existingIndex = users.findIndex(u => u.name === user.name);
  if (existingIndex !== -1) {
    users[existingIndex] = user; // Update
  } else {
    users.push(user); // Add
  }

  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  res.json({ message: "Profile saved!" });
});

module.exports = router;
