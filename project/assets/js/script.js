
// Write function to get movie input, genre, and rating into localStorage
// Write function to alert user to input movie name if movie name, genre, or rating is empty
// Write function to form-counter to count everytime user submits
const formEl = document.getElementById('form-counter');
const movieEl = document.getElementById('movie-name');
const genreEl = document.getElementById('genre');
const rateEl = document.getElementById('star-rating');
const submitEl = document.getElementById('submit');
const errorElement = document.createElement('p');

const formCounter = function () {
    // Everytime formCounter is called, the form counter goes up by 1
    let prevCount = JSON.parse(localStorage.getItem('count'));
    if (prevCount < 10) {
        prevCount++;
    }
    localStorage.setItem('count', JSON.stringify(prevCount))
    return prevCount;
}

submitEl.addEventListener('click', function(){
    if (!movieEl.value || !genreEl.value || !rateEl.value){
        errorElement.id = 'error';
        errorElement.textContent = "";
        errorElement.textContent = 'Please fill out all fields';
        formEl.appendChild(errorElement);
    } else if (document.getElementById('error')){
        errorElement.remove();
    } else {
        formEl.textContent = `${formCounter()}/10`
    }
});

window.onload = function() {
    localStorage.setItem('count', (1));
    formEl.textContent = `1/10`
}
