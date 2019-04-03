
var questions = [
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


const COLOR_WHITE = "#fff";
const COLOR_LIGHT_BLUE = "#057ce4";
const COLOR_DARK_BLUE = "#003f75";
const COLOR_LIGHT_GREEN = "#03bbbb";
const COLOR_DARK_GREEN = "#016969";
const COLOR_LIGHT_RED = "#df030e";
const COLOR_DARK_RED = "#790018";
const COLOR_LIGHT_YELOW = "#ebc168";
const COLOR_DARK_YELOW = "#eea300";
const ENTER_KEYCODE = 13;
const SPACE_KEYCODE = 32;


var currentQuestionIndex = 0;
var numCorrectAnswers = 0;
var numWrongAnswers = 0;


// ------ Funciones de respuesta a acciones de usuario ------

function startGame() {
    currentQuestionIndex = 0;
    numCorrectAnswers = 0;
    numWrongAnswers = 0;
    questions.forEach(q => {q.status = 0;
                            changeLetterBackground(q.letter, COLOR_LIGHT_BLUE, COLOR_DARK_BLUE);
                           }
    );
    updateScoreboard(numCorrectAnswers, numWrongAnswers);
    currentQuestionIndex = getIndexNextQuestion(currentQuestionIndex);
    prepareLetter(currentQuestionIndex);
    invisible('welcome-board');
    invisible('finish-board');
    visible('game-board');
    visible('scoreboard');
    addListenerForKeyUp(ENTER_KEYCODE);
    addListenerForKeyUp(SPACE_KEYCODE);
};


function validateAnswer() {
    var answer = getUserAnswer();
    if (isCorrectAnswer(currentQuestionIndex, answer)) {
        numCorrectAnswers++;
        changeLetterBackground(getQuestionLetter(currentQuestionIndex), 
                               COLOR_LIGHT_GREEN, COLOR_DARK_GREEN);
    } else {
        numWrongAnswers++;
        changeLetterBackground(getQuestionLetter(currentQuestionIndex), 
                               COLOR_LIGHT_RED, COLOR_DARK_RED);            
    };
    updateScoreboard(numCorrectAnswers, numWrongAnswers);
    
    currentQuestionIndex = getIndexNextQuestion(++currentQuestionIndex);
    if (currentQuestionIndex < questions.length) {
        prepareLetter(currentQuestionIndex);
    } else {
        showResult(numCorrectAnswers);
        invisible('game-board');
        visible('finish-board');
    };
};

function pasapalabra() {
    changeLetterBackground(questions[currentQuestionIndex].letter, COLOR_LIGHT_BLUE, COLOR_DARK_BLUE);

    currentQuestionIndex = getIndexNextQuestion(++currentQuestionIndex);
    prepareLetter(currentQuestionIndex);
};

function finishGame() {
    questions.forEach(q => {changeLetterBackground(q.letter, COLOR_LIGHT_BLUE, COLOR_DARK_BLUE)});
    visible('welcome-board');
    invisible('game-board');
    invisible('scoreboard');    
};


// ------ Funciones de interacción con el DOM ------

function addListenerForKeyUp(code) {
  document.getElementById('user-answer').addEventListener('keyup',function(event){
         if (event.keyCode === code) {
            if (code === ENTER_KEYCODE) {
                validateAnswer();
            } else {
                pasapalabra();
            };
        };
    });
};

function invisible(element) {
	document.getElementById(element).style.display = 'none';
};

function visible(element) {
	document.getElementById(element).style.display = 'flex';
};

function changeLetterBackground(letter, colorIn, colorOut) {
    document.getElementById(letter).style.backgroundImage = `radial-gradient(circle, ${colorIn} 15%, ${colorOut} 100%)`;
};

function updateScoreboard(numCorrectAnswers, numWrongAnswers) {
    document.getElementById('correct').innerHTML = numCorrectAnswers;
    document.getElementById('mistake').innerHTML = numWrongAnswers;    
};

function showQuestion(message) {
    document.getElementById('question').innerHTML = message;
};

function showResult(result) {
    document.getElementById('result').innerHTML = result;
};

function getUserAnswer() {
    return document.getElementById('user-answer').value;
};

function inilializeUserAnswer() {
    document.getElementById('user-answer').value = "";
    document.getElementById('user-answer').focus();
};


// ------ Funciones de lógica del programa ------

function prepareLetter(index) {
    showQuestion(getQuestionMessage(index));  
    inilializeUserAnswer();
    changeLetterBackground(getQuestionLetter(index), COLOR_LIGHT_YELOW, COLOR_DARK_YELOW);
};

function getIndexNextQuestion(currentQuestionIndex) {
    var repeat = true;
    var index = currentQuestionIndex;
    if (index == questions.length) {
        index = 0;
    };
    while (repeat) {
        if (questions[index].status === 0) {
            repeat = false;
        } else {
            index++;
            if (index === questions.length) {
                repeat = false;
            };
        };
    };
    return index;
};

function getQuestionMessage(index) {
    return questions[index].question;
};

function getQuestionLetter(index) {
    return questions[index].letter;
};

function isCorrectAnswer(index, answer) {
    var correctAnswer = answer.toLowerCase().trim() == questions[index].answer;
    if (correctAnswer) {
        questions[index].status = 1;
    } else {
        questions[index].status = 2;
    };
    return correctAnswer;
};

