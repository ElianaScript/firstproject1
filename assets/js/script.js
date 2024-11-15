const clearButton = document.querySelector("#clear");
const movieNameInput = document.querySelector("#movie-name");
const genreInput = document.querySelector("#genre");
const starRatingInput = document.querySelector("#star-rating");
const formEl = document.getElementById('form-counter');
const errorElement = document.createElement('p');
const submitButton = document.querySelector("#conditional-btn");
let moviesList =  JSON.parse(localStorage.getItem("moviesList")) || [];
let movieCount = moviesList.length;

const maxMovies = 5;
const formCounter = function () {
    // Everytime formCounter is called, the form counter goes up by 1
    let prevCount = (JSON.parse(localStorage.getItem('count'))) || 1;
    if (prevCount < maxMovies) {
        prevCount++;
    }
    localStorage.setItem('count', JSON.stringify(prevCount))
    return prevCount;
}


const errorfunc = function() {
    if (!movieNameInput.value || !genreInput.value || !starRatingInput.value){
        errorElement.id = 'error';
        errorElement.textContent = "";
        errorElement.textContent = 'Please fill out all fields';
        formEl.appendChild(errorElement);
    }else {
        formEl.textContent = `${formCounter()}/${maxMovies}`
    }
    if (document.getElementById('error')){
        errorElement.remove();
}}

function updateMovieCount() {
    return moviesList.length;
}

submitButton.addEventListener("click", function(event) {
    
    event.preventDefault();
    
    const movie = movieNameInput.value.trim();
    const genre = genreInput.value;
    const star = starRatingInput.value;
    errorfunc();
    
    if (movie && genre && star) {
        moviesList.push({movie, genre, rating: star});
        movieCount++;
        localStorage.setItem("moviesList", JSON.stringify(moviesList));
        
        
        movieNameInput.value ="";
        genreInput.selectedIndex = 0;
        starRatingInput.selectedIndex = 0;
        console.log(movieCount);
        if (movieCount == maxMovies) {
            console.log('activate');
            
            submitButton.disabled = true;
            
            storeMoviesList(moviesList);
            
            const modalElement = document.getElementById("conditionalModal");
            
            const modal = new bootstrap.Modal(modalElement);
            
            modal.show();
        } else {
            // alert(`You have submitted ${movieCount} movies. Please submit ${maxMovies - movieCount} more`);
            
        }} else {
            // alert("Please fill in all fields before submitting!");
        }
    });
    
    clearButton.addEventListener("click", function() {
        movieNameInput.value = "";
    genreInput.selectedIndex = 0;
    starRatingInput.selectedIndex = 0;
});

function displayMoviesList(movies) {
    const moviesListContainer = document.getElementById("movie-list");
    moviesListContainer.innerHTML = "";
    
    movies.forEach((movieObj, index) => {
        const movieElement = document.createElement("p");
        movieElement.textContent =`${index +1}. Movie: ${movieObj.movie}, Genre: ${movieObj.genre}, Rating: ${movieObj.rating} star(s).`;
        moviesListContainer.appendChild(movieElement);
    });
}

function storeMoviesList(movies) {
    let movieGenre = {};
    
    movies.forEach ((movieObj) =>  {
        if  (movieGenre[movieObj.genre]) {
            movieGenre[movieObj.genre]++;
        } else {
            movieGenre[movieObj.genre] = 1;
        }
    });
    
    const sortedGenres = Object.entries(movieGenre).sort((a,b) => b[1] - a[1]);
    const topGenres = sortedGenres.slice(0,3).map(genre => genre[0]);
    
    let movieSummary = `The top three movie genres you have selected are: ${topGenres.join(", ")}.\n\n`;
    
    movies.forEach((movieObj, index) => {
        movieSummary += `${index + 1}. Movie: ${movieObj.movie}, Genre: ${movieObj.genre}, Rating: ${movieObj.rating} star(s)\n`;
    });
    const modaltext = document.getElementById('modal-body');
    modaltext.textContent = movieSummary;
}


window.onload = function() {
    localStorage.setItem('count', (1));
    formEl.textContent = `1/${maxMovies}`
}
