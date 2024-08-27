// This code defines constants for the API URL, search API, image path, and movie details.

const MOVIE_URL = "https://api.themoviedb.org/3/discover/movie";
const TV_URL = "https://api.themoviedb.org/3/discover/tv";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const API_KEY = "a524f9e232d8b09c0ac0db868ddbd59e";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// create an function for tvLink in navbar
async function getTV() {
  try {
    const response = await fetch(TV_URL+`?api_key=${API_KEY}`);
    const data = await response.json();
    showMovies(data.results);
  } catch (error) {
    console.log("Error fetching movies:", error);
  }
}
// It also defines functions to get and show movies, and an event listener for the search form.
// Get Initial Movies 
getMovies(MOVIE_URL+`?api_key=${API_KEY}`);
// The getMovies function fetches data from the API and logs the results to the console.

async function getMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    showMovies(data.results);
  } catch (error) {
    console.log("Error fetching movies:", error);
  }
}
// The showMovies function creates HTML elements for each movie and appends them to the main element.

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, original_name, poster_path, overview ,id} = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <a href="https://vidsrc.to/embed/${title ? 'movie' : 'tv'}/${id}" >
    <img src="${IMG_PATH + poster_path}" alt="${title || original_name}" />
      <div class="movie-info">
        <h3 class="title">${title || original_name}</h3>
      </div>
      <div class="overview">
        <h3 class="title">Overview</h3>
        <h2 class="title"><a href="/">${title || original_name}</a></h2>
        <p>${overview}</p>
      </div> 
      </a>
    `;
    main.appendChild(movieEl);
  });
}
/* 
// The event listener prevents the default form submission behavior,
 gets the search term from the input field, and calls the getMovies 
 function with the search API URL and search term.

*/

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
   const searchTerm = search.value.trim();

  if (searchTerm) {
    const url = `${SEARCH_API}?api_key=${API_KEY}&query=${searchTerm}`;
    getMovies(url);
  } else {
    alert("Please enter a movie title");
  }
});
