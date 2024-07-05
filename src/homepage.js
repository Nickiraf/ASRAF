// Fetch top picks anime data
fetch('https://api.jikan.moe/v4/top/anime')
  .then(response => response.json())
  .then(data => {
    const topPicks = data.data.slice(0, 9);
    const topPicksHTML = topPicks.map(anime => {
      return `
        <div class="anime-card" data-id="${anime.mal_id}">
          <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
          <h2>${anime.title}</h2>
          <p>Score: ${anime.score}</p>
          <p>Rank: ${anime.rank}</p>
        </div>
      `;
    }).join('');
    document.getElementById('top-picks').innerHTML = topPicksHTML;

    // Add click event listeners to anime cards
    document.querySelectorAll('.anime-card').forEach(card => {
      card.addEventListener('click', () => {
        const animeId = card.getAttribute('data-id');
        window.location.href = `index.html?anime_id=${animeId}`;
      });
    });
  })
  .catch(error => console.error('Error:', error));

// Search anime functionality
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    // Redirect to list.html with the search term as a query parameter
    window.location.href = `list.html?search=${searchTerm}`;
  }
});

// Fetch anime data by genre
fetch('https://api.jikan.moe/v4/genres/anime')
  .then(response => response.json())
  .then(data => {
    const genres = data.data;
    const genreList = document.getElementById('genre-list');
    genres.forEach(genre => {
      const genreItem = document.createElement('li');
      genreItem.innerHTML = `<a href="genre.html?genre=${genre.mal_id}">${genre.name}</a>`;
      genreList.appendChild(genreItem);
    });
  })
  .catch(error => console.error('Error:', error));


