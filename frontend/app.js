document.getElementById("profile-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // ← important: prevents default GET

  const formData = new FormData(e.target);
  const user = {
    name: formData.get("name"),
    genres: formData.get("genres").split(",").map(s => s.trim()),
    languages: formData.get("languages").split(",").map(s => s.trim()),
    dislikes: formData.get("dislikes").split(",").map(s => s.trim())
  };

  const res = await fetch("http://localhost:3000/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  const data = await res.json();
  document.getElementById("profile-response").textContent = data.message;
});

document.getElementById("rec-btn").addEventListener("click", async () => {
  const name = document.querySelector("input[name='name']").value;
  const mood = document.getElementById("mood-input").value;

  if (!name) return;

  const res = await fetch(
    `http://localhost:3000/api/recommend/${encodeURIComponent(name)}?mood=${encodeURIComponent(mood)}`
  );
  const data = await res.json();
  document.getElementById("recommendation").textContent = data.recommendation;
});
