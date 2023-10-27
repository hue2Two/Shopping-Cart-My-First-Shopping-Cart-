document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.querySelectorAll(".myButtons");

    buttons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            console.log("Clicked element ID:", event.target.id);
        });
    });
});
