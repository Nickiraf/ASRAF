document.addEventListener('DOMContentLoaded', function() {
  // Get search term from URL parameter
  const searchTerm = new URLSearchParams(window.location.search).get('search');

  // Function to display anime results on the page
  function displayAnimeResults(animeData) {
    var resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = ''; // Clear previous results

    animeData.forEach(anime => {
      var animeContainer = document.createElement("div");
      animeContainer.classList.add("anime-container");

      var animeTitle = document.createElement("p");
      animeTitle.innerText = anime.title;
      animeTitle.classList.add("anime-title");
      animeContainer.appendChild(animeTitle); // Append title

      var animeImage = document.createElement("img");
      animeImage.src = anime.images.jpg.image_url;
      animeImage.alt = "Anime Image";
      animeImage.classList.add("anime-image");
      animeContainer.appendChild(animeImage); // Append image

      var addToWatchlistButton = document.createElement("button");
      addToWatchlistButton.innerText = "Add to Watchlist";
      addToWatchlistButton.classList.add("add-to-watchlist-button");
      addToWatchlistButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click event from bubbling up
        addToWatchlist(anime);
      });
      animeContainer.appendChild(addToWatchlistButton);

      resultsContainer.appendChild(animeContainer);

      animeContainer.addEventListener('click', function() {
        window.location.href = `index.html?anime_id=${anime.mal_id}`;
      });
    });
  }

  // Function to add an anime to the watchlist in local storage
  function addToWatchlist(anime) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (!watchlist.some(item => item.mal_id === anime.mal_id)) {
      watchlist.push(anime);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      alert(`${anime.title} has been added to your watchlist!`);
      window.location.href = 'watchlist.html';
    } else {
      alert(`${anime.title} is already in your watchlist.`);
    }
  }

  // Fetch anime based on search term if present
  if (searchTerm) {
    fetch(`https://api.jikan.moe/v4/anime?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        displayAnimeResults(data.data); // Display all anime results with the same keyword
      })
      .catch(error => console.error('Error:', error));
  }

  // Event listener for the search button
  document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value.trim();
    if (searchTerm) {
      window.location.href = `list.html?search=${searchTerm}`;
    }
  });
});


