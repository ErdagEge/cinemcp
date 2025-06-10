const form = document.getElementById("profile-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const user = {
    name: formData.get("name"),
    genres: formData.get("genres").split(",").map(x => x.trim()),
    languages: formData.get("languages").split(",").map(x => x.trim()),
    dislikes: formData.get("dislikes").split(",").map(x => x.trim())
  };

  const res = await fetch("http://localhost:3000/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  const result = await res.json();
  document.getElementById("profile-response").textContent = result.message;
});
