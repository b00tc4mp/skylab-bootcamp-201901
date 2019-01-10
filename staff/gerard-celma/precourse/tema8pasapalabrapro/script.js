const instructionsText = document.querySelector("#instructions");
const startButton = document.querySelector("#start");
const questionScreen = document.querySelector("#answer");
const answerScreen = document.querySelector("#reply");
const screen = document.querySelector("#screen");
const buttonAccept = document.querySelector("#submitText");
const buttonPasapalabra = document.querySelector("#submitPasa");
const points = document.querySelector("#row14");
const replay = document.querySelector("#replay");
const repButton = document.querySelector("#repButton");
const aCircle = document.querySelector("#A-circle");const bCircle = document.querySelector("#B-circle");const cCircle = document.querySelector("#C-circle");const dCircle = document.querySelector("#D-circle");const eCircle = document.querySelector("#E-circle");const fCircle = document.querySelector("#F-circle");const gCircle = document.querySelector("#G-circle");const hCircle = document.querySelector("#H-circle");const iCircle = document.querySelector("#I-circle");const jCircle = document.querySelector("#J-circle");const lCircle = document.querySelector("#L-circle");const mCircle = document.querySelector("#M-circle");const nCircle = document.querySelector("#N-circle");const ñCircle = document.querySelector("#Ñ-circle");const oCircle = document.querySelector("#O-circle");const pCircle = document.querySelector("#P-circle");const qCircle = document.querySelector("#Q-circle");const rCircle = document.querySelector("#R-circle");const sCircle = document.querySelector("#S-circle");const tCircle = document.querySelector("#T-circle");const uCircle = document.querySelector("#U-circle");const vCircle = document.querySelector("#V-circle");const xCircle = document.querySelector("#X-circle");const yCircle = document.querySelector("#Y-circle");const zCircle = document.querySelector("#Z-circle");




var questions = [
    { letter: "a", answer: "abducir", question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien") },
    { letter: "b", answer: "bingo", question: ("CON LA B. Juego que ha sacado de quicio a muchos bingueros...") },
    { letter: "c", answer: "churumbel", question: ("CON LA C. Niño, crío, bebé") },
    { letter: "d", answer: "diarrea", question: ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida") },
    { letter: "e", answer: "ectoplasma", question: ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación") },
    { letter: "f", answer: "facil", question: ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad") },
    { letter: "g", answer: "galaxia", question: ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas") },
    { letter: "h", answer: "harakiri", question: ("CON LA H. Suicidio ritual japonés por desentrañamiento") },
    { letter: "i", answer: "iglesia", question: ("CON LA I. Templo cristiano") },
    { letter: "j", answer: "jabali", question: ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba") },
    { letter: "l", answer: "licantropo", question: ("CON LA L. Hombre lobo") },
    { letter: "m", answer: "misantropo", question: ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas") },
    { letter: "n", answer: "necedad", question: ("CON LA N. Demostración de poca inteligencia") },
    { letter: "ñ", answer: "señal", question: ("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.") },
    { letter: "o", answer: "orco", question: ("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien") },
    { letter: "p", answer: "protoss", question: ("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft") },
    { letter: "q", answer: "queso", question: ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche") },
    { letter: "r", answer: "raton", question: ("CON LA R. Roedor") },
    { letter: "s", answer: "stackoverflow", question: ("CON LA S. Comunidad salvadora de todo desarrollador informático") },
    { letter: "t", answer: "terminator", question: ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984") },
    { letter: "u", answer: "unamuno", question: ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914") },
    { letter: "v", answer: "vikingos", question: ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa") },
    { letter: "x", answer: "botox", question: ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética") },
    { letter: "y", answer: "peyote", question: ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos") },
    { letter: "z", answer: "zen", question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional") },
]

var counterCorrect = 0;
var circles = [aCircle, bCircle, cCircle, dCircle, eCircle, fCircle, gCircle, hCircle, iCircle, jCircle, lCircle, mCircle, nCircle, ñCircle, oCircle, pCircle, qCircle, rCircle, sCircle, tCircle, uCircle, vCircle, xCircle, yCircle, zCircle];
var questionIdx = 0;




function answerQuestion() {
    var answer = answerScreen.value;
    if (answer == questions[questionIdx].answer) {
        circles[questionIdx].classList.add("green");
        counterCorrect++;
        points.innerHTML = "Aciertos: "+counterCorrect;
    } else {
        circles[questionIdx].classList.add("red");
    }
    questionIdx++;
    throwQuestion();
}


function pasapalabra() {
    questions.push(questions[questionIdx]);
    circles.push(circles[questionIdx]);
    questionIdx++;
    throwQuestion();
}


function throwQuestion() {
    if (questionIdx<questions.length) {
        screen.innerHTML = questions[questionIdx].question;
    } else {
        questionScreen.classList.toggle("hide");
        replay.classList.toggle("hide");
        screen.innerHTML = "¡Felicidades! Has finlizado el juego con " +counterCorrect+ " aciertos.";
    }
}
    

function playAgain() {
    questions = [
        { letter: "a", answer: "abducir", question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien") },
        { letter: "b", answer: "bingo", question: ("CON LA B. Juego que ha sacado de quicio a muchos bingueros...") },
        { letter: "c", answer: "churumbel", question: ("CON LA C. Niño, crío, bebé") },
        { letter: "d", answer: "diarrea", question: ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida") },
        { letter: "e", answer: "ectoplasma", question: ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación") },
        { letter: "f", answer: "facil", question: ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad") },
        { letter: "g", answer: "galaxia", question: ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas") },
        { letter: "h", answer: "harakiri", question: ("CON LA H. Suicidio ritual japonés por desentrañamiento") },
        { letter: "i", answer: "iglesia", question: ("CON LA I. Templo cristiano") },
        { letter: "j", answer: "jabali", question: ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba") },
        { letter: "l", answer: "licantropo", question: ("CON LA L. Hombre lobo") },
        { letter: "m", answer: "misantropo", question: ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas") },
        { letter: "n", answer: "necedad", question: ("CON LA N. Demostración de poca inteligencia") },
        { letter: "ñ", answer: "señal", question: ("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.") },
        { letter: "o", answer: "orco", question: ("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien") },
        { letter: "p", answer: "protoss", question: ("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft") },
        { letter: "q", answer: "queso", question: ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche") },
        { letter: "r", answer: "raton", question: ("CON LA R. Roedor") },
        { letter: "s", answer: "stackoverflow", question: ("CON LA S. Comunidad salvadora de todo desarrollador informático") },
        { letter: "t", answer: "terminator", question: ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984") },
        { letter: "u", answer: "unamuno", question: ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914") },
        { letter: "v", answer: "vikingos", question: ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa") },
        { letter: "x", answer: "botox", question: ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética") },
        { letter: "y", answer: "peyote", question: ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos") },
        { letter: "z", answer: "zen", question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional") },
    ];
    counterCorrect = 0;
    var circles = [aCircle, bCircle, cCircle, dCircle, eCircle, fCircle, gCircle, hCircle, iCircle, jCircle, lCircle, mCircle, nCircle, ñCircle, oCircle, pCircle, qCircle, rCircle, sCircle, tCircle, uCircle, vCircle, xCircle, yCircle, zCircle];
    questionIdx = 0;
    for (var i=0; i<circles.length; i++) {
        circles[i].classList.remove("green");
        circles[i].classList.remove("red");
    }
    instructionsText.classList.toggle("hide");
    startButton.classList.toggle("hide");
    replay.classList.toggle("hide");
    screen.classList.toggle("hide");
    points.innerHTML = "Aciertos: "+counterCorrect;
}
    
// Main
function initGame() {
    instructionsText.classList.toggle("hide");
    startButton.classList.toggle("hide");
    screen.classList.toggle("hide");
    questionScreen.classList.toggle("hide");
    throwQuestion();
}



startButton.addEventListener("click", initGame, false);
buttonAccept.addEventListener("click", answerQuestion, false);
buttonPasapalabra.addEventListener("click", pasapalabra , false);
repButton.addEventListener("click", playAgain, false);










