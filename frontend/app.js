const API_BASE =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://cinemcp-backend.onrender.com';

async function loadGenres() {
  try {
    const res = await fetch(`${API_BASE}/api/genres`);
    const genres = await res.json();
    const pref = document.getElementById('genres-preferred');
    const dislike = document.getElementById('genres-disliked');
    genres.forEach(g => {
      const cb1 = document.createElement('input');
      cb1.type = 'checkbox';
      cb1.name = 'genres';
      cb1.value = g.name;
      cb1.id = `pref-${g.id}`;

      const label1 = document.createElement('label');
      label1.htmlFor = cb1.id;
      label1.textContent = g.name;

      const wrapper1 = document.createElement('div');
      wrapper1.appendChild(cb1);
      wrapper1.appendChild(label1);

      pref.appendChild(wrapper1);

      const cb2 = document.createElement('input');
      cb2.type = 'checkbox';
      cb2.name = 'dislikes';
      cb2.value = g.name;
      cb2.id = `dislike-${g.id}`;

      const label2 = document.createElement('label');
      label2.htmlFor = cb2.id;
      label2.textContent = g.name;

      const wrapper2 = document.createElement('div');
      wrapper2.appendChild(cb2);
      wrapper2.appendChild(label2);

      dislike.appendChild(wrapper2);
    });
  } catch (err) {
    console.error('Failed to load genres', err);
  }
}

function loadLanguages() {
  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Japanese',
    'Chinese',
    'Hindi'
  ];
  const container = document.getElementById('language-chips');
  languages.forEach(lang => {
    const chip = document.createElement('div');
    chip.className = 'chip';
    chip.textContent = lang;
    chip.dataset.selected = 'false';
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      chip.dataset.selected = chip.classList.contains('selected');
    });
    container.appendChild(chip);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadGenres();
  loadLanguages();
});

document.getElementById('profile-form').addEventListener('submit', async e => {
  e.preventDefault();
  const name = e.target.elements.name.value;
  const genres = Array.from(document.querySelectorAll("input[name='genres']:checked"))
    .map(cb => cb.value);
  const dislikes = Array.from(document.querySelectorAll("input[name='dislikes']:checked"))
    .map(cb => cb.value);
  const languages = Array.from(document.querySelectorAll('.chip.selected'))
    .map(chip => chip.textContent);

  const user = { name, genres, languages, dislikes };

  try {
    const res = await fetch(`${API_BASE}/api/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    const data = await res.json();
    document.getElementById('profile-response').textContent = data.message;
  } catch (err) {
    document.getElementById('profile-response').textContent = 'Error saving profile';
  }
});

document.getElementById('rec-btn').addEventListener('click', async () => {
  const name = document.querySelector("input[name='name']").value;
  const mood = document.getElementById('mood-input').value;
  if (!name) return;
  try {
    const res = await fetch(
      `${API_BASE}/api/recommend/${encodeURIComponent(name)}?mood=${encodeURIComponent(mood)}`
    );
    const data = await res.json();
    showRecommendation(data);
  } catch (err) {
    document.getElementById('recommendation-box').textContent = 'Error fetching recommendation';
  }
});

document.getElementById('reset-btn').addEventListener('click', () => {
  document.getElementById('profile-form').reset();
  document.getElementById('profile-response').textContent = '';
  document.getElementById('recommendation-box').innerHTML = '';
  document.getElementById('movie-grid').innerHTML = '';
});

function showRecommendation(data) {
  const recommendationBox = document.getElementById('recommendation-box');
  const movieGrid = document.getElementById('movie-grid');
  recommendationBox.innerHTML = `\n  <div class="recommendation-card">\n    <h3>🎬 Recommendation</h3>\n    <p>${data.recommendation || ''}</p>\n  </div>\n`;
  movieGrid.innerHTML = '';

  if (Array.isArray(data.movies)) {
    data.movies.forEach(movie => {
      const card = document.createElement('div');
      card.className = 'movie-card';

      if (movie.poster_path) {
        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        img.alt = movie.title;
        card.appendChild(img);
      }

      const title = document.createElement('h4');
      const year = movie.release_date ? ` (${movie.release_date.slice(0,4)})` : '';
      title.textContent = movie.title + year;
      card.appendChild(title);

      const overview = document.createElement('p');
      overview.textContent = movie.overview;
      card.appendChild(overview);

      movieGrid.appendChild(card);
    });
  }
}
