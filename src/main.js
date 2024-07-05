// Get anime ID from URL parameter
const animeId = new URLSearchParams(window.location.search).get('anime_id');

// Fetch anime data if anime ID is present
if (animeId) {
  fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
    .then(response => response.json())
    .then(data => {
      const animeData = data.data;
      document.getElementById('anime-image').src = animeData.images.jpg.image_url;
      document.getElementById('title').textContent = animeData.title;
      document.getElementById('synopsis').textContent = animeData.synopsis;
      document.getElementById('score').textContent = animeData.score;
      document.getElementById('rank').textContent = animeData.rank;
      document.getElementById('popularity').textContent = animeData.popularity;
      document.getElementById('genres').textContent = animeData.genres.map(genre => genre.name).join(', ');
      document.getElementById('producers').textContent = animeData.producers.map(producer => producer.name).join(', ');
      document.getElementById('source').textContent = animeData.source;
      document.getElementById('rating').textContent = animeData.rating;
      document.getElementById('releases').textContent = animeData.aired.prop.from;
      document.getElementById('schedules').textContent = animeData.broadcast.string;
      document.getElementById('mal-url').href = animeData.url;
      
      // Fetch related anime
      fetch(`https://api.jikan.moe/v4/anime/${animeId}/recommendations`)
        .then(response => response.json())
        .then(data => {
          const relatedAnime = data.data;
          displayRelatedAnime(relatedAnime);
        })
        .catch(error => console.error('Error fetching related anime:', error));
    })
    .catch(error => console.error('Error:', error));
}

function displayRelatedAnime(relatedAnime) {
  const relatedAnimeContainer = document.getElementById('related-anime-container');
  relatedAnimeContainer.innerHTML = '';

  relatedAnime.forEach(anime => {
    const animeDiv = document.createElement('div');
    animeDiv.classList.add('related-anime');

    const animeImage = document.createElement('img');
    animeImage.src = anime.entry.images.jpg.image_url;
    animeImage.alt = "Related Anime Image";
    animeImage.classList.add('related-anime-image');
    animeDiv.appendChild(animeImage);

    const animeTitle = document.createElement('p');
    animeTitle.innerText = anime.entry.title;
    animeTitle.classList.add('related-anime-title');
    animeDiv.appendChild(animeTitle);

    animeDiv.addEventListener('click', () => {
      window.location.href = `index.html?anime_id=${anime.entry.mal_id}`;
    });

    relatedAnimeContainer.appendChild(animeDiv);
  });
}




