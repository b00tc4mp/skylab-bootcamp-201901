const TEXT = document.getElementById("text");
const BUTTON = document.getElementById("btn-style");

// Nomes em funciones amb querySelector???
const FORM = document.querySelector("form");
const INPUT1 = document.querySelector("#name");
const INPUT2 = document.querySelector("#surname");

// Nomes veig per consola els tags, no el contingut?
const LIELEMENTS = document.querySelectorAll("li");

function changeColor() {
    TEXT.style.color = "blue";
}


BUTTON.addEventListener("click", changeColor, false);

FORM.addEventListener("submit", (e) => {
    e.preventDefault();
    let query = INPUT1.value + " " +INPUT2.value;
    console.log(query);
}); 
    
document.onload(console.log(LIELEMENTS));