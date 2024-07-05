// Get genre from URL parameter
const genre = new URLSearchParams(window.location.search).get('genre');

// Set genre title
document.getElementById('genre-title').textContent = `${genre} Anime`;

// Fetch anime data by genre
fetch(`https://api.jikan.moe/v4/anime?genres=${genre}`)
  .then(response => response.json())
  .then(data => {
    const animeList = data.data;
    const animeListHTML = animeList.map(anime => {
      return `
        <div class="anime-card" data-id="${anime.mal_id}">
          <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
          <h2>${anime.title}</h2>
          <p>Score: ${anime.score}</p>
          <p>Rank: ${anime.rank}</p>
        </div>
      `;
    }).join('');
    document.getElementById('anime-list').innerHTML = animeListHTML;

    // Add click event listeners to anime cards
    document.querySelectorAll('.anime-card').forEach(card => {
      card.addEventListener('click', () => {
        const animeId = card.getAttribute('data-id');
        window.location.href = `index.html?anime_id=${animeId}`;
      });
    });
  })
  .catch(error => console.error('Error:', error));
