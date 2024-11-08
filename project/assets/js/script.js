document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submit");
    const clearButton = document.getElementById ("clear");
    const movieInput = document.getElementById("movie-name");
    const genreSelect = document.getElementById("genre");
    const starSelect = document.getElementById("rating");

    submitButton.addEventListener("click", function(event) {
        event.preventDefault();

        const movie =movieInput.value.trim();
        const genre = genreSelect.value;
        const rating = ratingSelect.value;

        if (movie && genre && rating) {
            alert(`You submitted: \nMovie: ${movie}\nGenre: ${genre}\nRating ${rating} rating`);
        } else {
            alert("Please fill in all fields before submitting!");
        }
    });

    clearButton.addEventListener("click", function() {
        movieInput.value = "";
        genreSelect.selectedIndex = 0;
        ratingSelect.selectedIndex = 0;
    });
});