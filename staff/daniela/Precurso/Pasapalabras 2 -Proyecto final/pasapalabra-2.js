var pasapalabrasGame = [
    { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
    { letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé"},
    { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
    { letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
    { letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},
    { letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
    { letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento"},
    { letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano"},
    { letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
    { letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"},
    { letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo"},
    { letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},
    { letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia"},
    { letter: "ñ", answer: "señal", status: 0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
    { letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
    { letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},
    { letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"},
    { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor"},
    { letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático"},
    { letter: "t", answer: "terminator", status: 0, question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},
    { letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},
    { letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},
    { letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"},
    { letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"},
    { letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},
    { letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},
]


// Inicio del juego

let $stepInstructions = document.querySelector("#step-instructions")
let $stepUsername = document.querySelector("#step-username")
let $stepGame = document.querySelector('#step-game')

let $userName = document.querySelector("#userName")
let $btnstartPlaying = document.querySelector("#btn-startPlaying")

// El juego inicia
let $userAnswer = document.querySelector("#userAnswer")
let $btnUserName = document.querySelector("#btnUserName")
let $btnAnswer = document.querySelector("#btn-answer")
let $btnPasapalabra = document.querySelector("#btn-pasapalabra")

let $questions = document.querySelector("#questions")
let $letters = document.querySelector("#letters")

// fin del juego

let $btnPlayAgain = document.querySelector("#btn-playAgain")


// Variables globales

let userName;
let actualIndex = 0;
let numOfRightAnswer = 0;
let numOfWrongAnswer = 0;
let playersResults = [];

// Constants
const STATUS_KO = -1
const STATUS_NOT_ANSWERED = 0
const STATUS_OK = 1
const QUESTION_NOT_FOUND = -1


//"Primer clic "quiero jugar" te dirige a la sección del nombre
$btnstartPlaying.addEventListener("click", function() {
    $stepInstructions.classList.add('hidden') // añadimos la clase hidden al element $instructions
    $stepUsername.classList.remove('hidden') // hacemos que se muestre el elemento eliminando la clase hidden
})


// Ingresar nombre y hacer click en "EMPEZAR"
$btnUserName.addEventListener("click", function(){
   
    userName = $userName.value;
    $stepUsername.classList.add('hidden') // ocultamos esta seccion añadiendo la clase hidden al elemento

    // aquí activo el juego
    $stepGame.classList.remove('hidden') // mostramos el juego quitándole la clase hidden

    // restaurar visibilidad cuando le den a play again y vuelva a salir
    $btnAnswer.style.display = ""
    $btnPasapalabra.style.display = ""
    $userAnswer.style.display = ""
    $btnPlayAgain.style.display = "none"

    updateLetters()
    $questions.innerHTML = getNextQuestion()

})


// crear letras

function updateLetters(){
    $letters.innerHTML = ""
    pasapalabrasGame.forEach((letterInfo) => {
        let className = "letter"
        console.log(letterInfo.status)
        if (letterInfo.status === STATUS_OK){
            className += " rightAnswer"  
        } else if(letterInfo.status === STATUS_KO){
            className += " wrongAnswer"
        }
        $letters.innerHTML += "<div class='" + className + "'>" + letterInfo.letter + "</div>"         
    })   
}


// Get next Question cuando hacen click en contestar o pasapalabra
function getNextQuestion() {
    let nextQuestionIndex = pasapalabrasGame.findIndex((letterInfo, index) => letterInfo.status === STATUS_NOT_ANSWERED && index >= actualIndex);
    
    if (nextQuestionIndex === QUESTION_NOT_FOUND) {
        nextQuestionIndex = pasapalabrasGame.findIndex(letterInfo => letterInfo.status === STATUS_NOT_ANSWERED);
    }

    actualIndex = nextQuestionIndex;
    return pasapalabrasGame[actualIndex].question;
}







// check Answers 
$btnAnswer.addEventListener("click", function(){
    console.log(pasapalabrasGame[actualIndex].answer)

    if (pasapalabrasGame[actualIndex].answer === $userAnswer.value){
        pasapalabrasGame[actualIndex].status = STATUS_OK
        numOfRightAnswer++

    } else {
        pasapalabrasGame[actualIndex].status = STATUS_KO
        numOfWrongAnswer++
    }

    if (pasapalabrasGame.length === (numOfRightAnswer + numOfWrongAnswer)){
        updateLetters()
        $btnAnswer.style.display = "none"
        $btnPasapalabra.style.display = "none"
        $userAnswer.style.display = "none"
        
        //sort del ranking
        playersResults.push({player: userName, score: numOfRightAnswer}) 
        rankingPlayers = sortRanking(playersResults)

        $questions.innerHTML =  "<p>" + userName + ", has llegado al final del juego.</p>" + "<p><strong>Ranking de jugadores:</strong></p>" + rankingPlayers

        // jugar otra vez
        $btnPlayAgain.style.display = "block"
    } else {
        $userAnswer.value = ""
        actualIndex++
        updateLetters()
        $questions.innerHTML = getNextQuestion()
    }
})


// botón pasapalabra


$btnPasapalabra.addEventListener("click", function(){
    $userAnswer.value = ""
    actualIndex++
    $questions.innerHTML = getNextQuestion()
    updateLetters()
})






//  sort de ranking de jugadores

function sortRanking(rankingPlayers){
    let playersRankingList = ""
    numOfRightAnswer = 0;
    numOfWrongAnswer = 0;
    sortedRankingList = rankingPlayers.sort(function(a, b){
        return b.score - a.score
    })

    for (ranking of sortedRankingList){
        playersRankingList += "<li>" + ranking.player + " " + ranking.score + " </li>"
    }

    return "<ol>" + playersRankingList + "</ol>"
}


$btnPlayAgain.addEventListener("click", function(){
    $stepGame.classList.add('hidden')
    $stepUsername.classList.remove('hidden')

    $btnPlayAgain.style.display = ""
    $userName.value = ""
    actualIndex = 0;
    numOfRightAnswer = 0;
    numOfWrongAnswer = 0;

    for (letterInfo of pasapalabrasGame){
        letterInfo.status = STATUS_NOT_ANSWERED
    }
}) 
