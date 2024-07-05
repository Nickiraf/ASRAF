document.addEventListener('DOMContentLoaded', () => {
  const watchlistContainer = document.getElementById('watchlist-container');
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  function renderWatchlist() {
    watchlistContainer.innerHTML = ''; // Clear the container

    if (watchlist.length > 0) {
      watchlist.forEach((anime, index) => {
        const animeContainer = document.createElement('div');
        animeContainer.classList.add('anime-container');

        const animeTitle = document.createElement('p');
        animeTitle.innerText = anime.title;
        animeTitle.classList.add('anime-title');
        animeContainer.appendChild(animeTitle);

        const animeImage = document.createElement('img');
        animeImage.src = anime.images?.jpg?.image_url || 'default_image_url.jpg';
        animeImage.alt = "Anime Image";
        animeImage.classList.add('anime-image');
        animeContainer.appendChild(animeImage);

        const statusLabel = document.createElement('label');
        statusLabel.innerText = 'Status: ';
        animeContainer.appendChild(statusLabel);

        const statusSelect = document.createElement('select');
        statusSelect.innerHTML = `
          <option value="Not Watched" ${anime.status === 'Not Watched' ? 'selected' : ''}>Not Watched</option>
          <option value="Watching" ${anime.status === 'Watching' ? 'selected' : ''}>Watching</option>
          <option value="Finished" ${anime.status === 'Finished' ? 'selected' : ''}>Finished</option>
        `;
        statusSelect.addEventListener('change', (event) => {
          updateStatus(index, event.target.value);
        });
        animeContainer.appendChild(statusSelect);

        const dateLabel = document.createElement('label');
        dateLabel.innerText = 'Watch Date: ';
        animeContainer.appendChild(dateLabel);

        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.value = anime.watchDate || '';
        dateInput.addEventListener('change', (event) => {
          updateWatchDate(index, event.target.value);
        });
        animeContainer.appendChild(dateInput);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
          deleteFromWatchlist(index);
        });
        animeContainer.appendChild(deleteButton);

        watchlistContainer.appendChild(animeContainer);
      });
    } else {
      watchlistContainer.innerText = 'Your watchlist is empty.';
    }
  }

  function updateStatus(index, status) {
    watchlist[index].status = status; // Update the status of the anime
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }

  function updateWatchDate(index, watchDate) {
    watchlist[index].watchDate = watchDate; // Update the watch date of the anime
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }

  function deleteFromWatchlist(index) {
    watchlist.splice(index, 1); // Remove the anime at the specified index
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    renderWatchlist(); // Re-render the watchlist
    
  }

  renderWatchlist(); // Initial render
});
