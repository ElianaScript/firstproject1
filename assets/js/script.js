const clearButton = document.querySelector("#clear");
const movieNameInput = document.querySelector("#movie-name");
const genreInput = document.querySelector("#genre");
const starRatingInput = document.querySelector("#star-rating");
const formEl = document.getElementById("form-counter");
const errorElement = document.createElement("p");
const submitButton = document.querySelector("#conditional-btn");

// get moviesList from local storage or create an array
let moviesList = JSON.parse(localStorage.getItem("moviesList")) || [];
let movieCount = 0; // Tracks movies in the current session without local storage
const maxMovies = 5;

// make the form counter
const initializeFormCounter = () => {
    formEl.textContent = `${movieCount+1}/${maxMovies}`;
};

// error handler
const errorFunc = () => {
    if (!movieNameInput.value || !genreInput.value || !starRatingInput.value) {
        errorElement.id = "error";
        errorElement.textContent = "Please fill out all fields.";
        if (!document.getElementById("error")) {
            formEl.appendChild(errorElement);
        }
    } else if (document.getElementById("error")) {
        errorElement.remove();
    }
};

submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    const movie = movieNameInput.value.trim();
    const genre = genreInput.value;
    const star = starRatingInput.value;

    errorFunc();

    if (movie && genre && star) {
        if (movieCount < maxMovies) {
            // add movie to the current session without local storage
            moviesList.push({ movie, genre, rating: star });
            movieCount++;

            // save the updated list to localStorage
            localStorage.setItem("moviesList", JSON.stringify(moviesList));

            // reset form fields
            movieNameInput.value = "";
            genreInput.selectedIndex = 0;
            starRatingInput.selectedIndex = 0;

            // update the counter display
            formEl.textContent = `${movieCount}/${maxMovies}`;

            // show modal and reset counter if the limit is reached
            if (movieCount === maxMovies) {
                storeMoviesList(moviesList);

                const modalElement = document.getElementById("conditionalModal");
                const modal = new bootstrap.Modal(modalElement);
                modal.show();

                // reset the counter for the next batch of movies 
                movieCount = 0;
                initializeFormCounter();

                // re-enable the submit button
                submitButton.disabled = false;
            }
        } else {
            alert("You have reached the maximum limit of 5 movies in this batch.");
        }
    }
});

clearButton.addEventListener("click", function () {
    movieNameInput.value = "";
    genreInput.selectedIndex = 0;
    starRatingInput.selectedIndex = 0;
});

function storeMoviesList(movies) {
    let movieGenre = {};

    movies.forEach((movieObj) => {
        if (movieGenre[movieObj.genre]) {
            movieGenre[movieObj.genre]++;
        } else {
            movieGenre[movieObj.genre] = 1;
        }
    });

    const sortedGenres = Object.entries(movieGenre).sort((a, b) => b[1] - a[1]);
    const topGenres = sortedGenres.slice(0, 3).map((genre) => genre[0]);

    let movieSummary = `Your Top Movies Are: ${topGenres.join(", ")}.<br><br>`;

    movies.forEach((movieObj, index) => {
        movieSummary += `${index + 1}. Movie: ${movieObj.movie}, Genre: ${movieObj.genre}, Rating: ${movieObj.rating} star(s).<br>`;
    });

    const modalText = document.getElementById("modal-body");
    modalText.innerHTML = movieSummary;
}

window.onload = function () {
    initializeFormCounter();

    if (moviesList.length > 0) {
        const modalElement = document.getElementById("conditionalModal");
        const modal = new bootstrap.Modal(modalElement);
        storeMoviesList(moviesList);
    }
};
