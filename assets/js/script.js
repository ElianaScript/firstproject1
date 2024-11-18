const clearButton = document.querySelector("#clear");
const movieNameInput = document.querySelector("#movie-name");
const genreInput = document.querySelector("#genre");
const starRatingInput = document.querySelector("#star-rating");
const formEl = document.getElementById("form-counter");
const errorElement = document.createElement("p");
const submitButton = document.querySelector("#conditional-btn");
const showButton = document.querySelector('#show-modal');

let moviesList = JSON.parse(localStorage.getItem("moviesList")) || [];
let movieCount = 1;
const maxMovies = 5;

const initializeFormCounter = () => {
    formEl.textContent = `${movieCount}/${maxMovies}`;
};

const errorFunc = () => {
    if (!movieNameInput.value || !genreInput.value || !starRatingInput.value) {
        errorElement.id = "error";
        errorElement.textContent = "Please fill out all fields.";
        if (!document.getElementById("error")) {
            formEl.appendChild(errorElement);
            document.getElementById('error').style.color = '#FF0000';
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
        moviesList.push({ movie, genre, rating: parseInt(star) });
        movieCount++;

        localStorage.setItem("moviesList", JSON.stringify(moviesList));

        movieNameInput.value = "";
        genreInput.selectedIndex = 0;
        starRatingInput.selectedIndex = 0;

        formEl.textContent = `${movieCount <= maxMovies ? movieCount : 1}/${maxMovies}`;

        if (movieCount > maxMovies) {

            updateRankings(moviesList);

            let modalElement = document.getElementById("conditionalModal");
            let modal = new bootstrap.Modal(modalElement);
            modal.show();

            movieCount = 1;
            initializeFormCounter();

            submitButton.disabled = false;
        }
    }
});

clearButton.addEventListener("click", function () {
    movieNameInput.value = "";
    genreInput.selectedIndex = 0;
    starRatingInput.selectedIndex = 0;
});

showButton. addEventListener("click", function (){
    updateRankings(moviesList)
    let modalElement = document.getElementById("conditionalModal");
    let modal = new bootstrap.Modal(modalElement);
    modal.show();
});
function updateRankings(movies) {
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

    const sortedMovies = [...movies].sort((a, b) => b.rating - a.rating);

    let movieSummary = `Your Top Genres Are: ${topGenres.join(", ")}.<br><br>`;
    movieSummary += `Top Movies (Sorted by Rating):<br>`;
    sortedMovies.forEach((movieObj, index) => {
        movieSummary += `${index + 1}. Movie: ${movieObj.movie}, Genre: ${movieObj.genre}, Rating: ${movieObj.rating} star(s).<br>`;
    });

    const modalText = document.getElementById("modal-body");
    modalText.innerHTML = movieSummary;
}

window.onload = function () {
    initializeFormCounter();
};
