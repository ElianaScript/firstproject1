const submitbutton = document.querySelector("#conditional-btn")
submitbutton.addEventListener("click", function() {

    const condition = true; 

    if (condition) {

        const modalElement = document.getElementById("conditionalModal");

        const modal = new bootstrap.Modal(modalElement);

        modal.show();
    }
});