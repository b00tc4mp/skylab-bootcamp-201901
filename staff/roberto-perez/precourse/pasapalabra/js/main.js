let questionNumber = 0;
let points = 0;
let errors = 0;
let countDownTimeout;
let playButton = document.getElementById("play");
let welcomeContainer = document.querySelector('.welcome');
let newGameButton = document.getElementById("new-game");
let questionContainer = document.querySelector('.question');
let resultsContainer = document.querySelector('.results');
let resultsPoints = document.querySelector('.results .success');
let sendButton = document.querySelector(".send");
let nextButton = document.querySelector(".next");
let questions = [
    {
        letter: "a",
        answer: "abducir",
        title: "Con la A",
        status: 0,
        question: "Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"
    },
    {
        letter: "b",
        answer: "bingo",
        title: "Con la B",
        status: 0,
        question: "Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"
    },
    {
        letter: "c",
        answer: "churumbel",
        title: "Con la C",
        status: 0,
        question: "Niño, crío, bebé"
    },
    {
        letter: "d",
        answer: "diarrea",
        title: "Con la D",
        status: 0,
        question: "Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"
    },
    {
        letter: "e",
        answer: "ectoplasma",
        title: "Con la E",
        status: 0,
        question: "Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"
    },
    {
        letter: "f",
        answer: "facil",
        title: "Con la F",
        status: 0,
        question: "Que no requiere gran esfuerzo, capacidad o dificultad"
    },
    {
        letter: "g",
        answer: "galaxia",
        title: "Con la G",
        status: 0,
        question: "Conjunto enorme de estrellas, polvo interestelar, gases y partículas"
    },
    {
        letter: "h",
        answer: "harakiri",
        title: "Con la H",
        status: 0,
        question: "Suicidio ritual japonés por desentrañamiento"
    },
    {
        letter: "i",
        answer: "iglesia",
        title: "Con la I",
        status: 0,
        question: "Templo cristiano"
    },
    {
        letter: "j",
        answer: "jabali",
        title: "Con la J",
        status: 0,
        question: "Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"
    },
    {
        letter: "k",
        answer: "kamikaze",
        title: "Con la K",
        status: 0,
        question: "Persona que se juega la vida realizando una acción temeraria"
    },
    {
        letter: "l",
        answer: "licantropo",
        title: "Con la L",
        status: 0,
        question: "Hombre lobo"
    },
    {
        letter: "m",
        answer: "misantropo",
        title: "Con la M",
        status: 0,
        question: "Persona que huye del trato con otras personas o siente gran aversión hacia ellas"
    },
    {
        letter: "n",
        answer: "necedad",
        title: "Con la N",
        status: 0,
        question: "Demostración de poca inteligencia"
    },
    {
        letter: "ñ",
        answer: "señal",
        title: "Contiene la Ñ",
        status: 0,
        question: "Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."
    },
    {
        letter: "o",
        answer: "orco",
        title: "Con la O",
        status: 0,
        question: "Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"
    },
    {
        letter: "p",
        answer: "protoss",
        title: "Con la P",
        status: 0,
        question: "Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"
    },
    {
        letter: "q",
        answer: "queso",
        title: "Con la Q",
        status: 0,
        question: "Producto obtenido por la maduración de la cuajada de la leche"
    },
    {
        letter: "r",
        answer: "raton",
        title: "Con la R",
        status: 0,
        question: "Roedor"
    },
    {
        letter: "s",
        answer: "stackoverflow",
        title: "Con la S",
        status: 0,
        question: "Comunidad salvadora de todo desarrollador informático"
    },
    {
        letter: "t",
        answer: "terminator",
        title: "Con la T",
        status: 0,
        question: "Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"
    },
    {
        letter: "u",
        answer: "unamuno",
        title: "Con la U",
        status: 0,
        question: "Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"
    },
    {
        letter: "v",
        answer: "vikingos",
        title: "Con la V",
        status: 0,
        question: "Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"
    },
    {
        letter: "w",
        answer: "sandwich",
        title: "Contiene la W",
        status: 0,
        question: "Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"
    },
    {
        letter: "x",
        answer: "botox",
        title: "Contene a X",
        status: 0,
        question: "Toxina bacteriana utilizada en cirujía estética"
    },
    {
        letter: "y",
        answer: "peyote",
        title: "Contiene la Y",
        status: 0,
        question: "Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"
    },
    {
        letter: "z",
        answer: "zen",
        title: "Con la Z",
        status: 0,
        question: "Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"
    }
];

const startGame = function () {
    showQuestion();
    countDown();
};

const endGame = function () {
    questionContainer.classList.add("hidden");
    resultsContainer.classList.remove("hidden");
    resultsPoints.textContent = points + ' punto' + ((points > 1) ? 's' : '');
    clearTimeout(countDownTimeout);
};

const nextQuestion = function () {
    if (questions.every(q => (q.status === 1 || q.status === 2))) {
        endGame();
        return;
    }
    highlightLetter(findCurrentLetter(questions[questionNumber]), 'current');
    showQuestion();
};

const showQuestion = function () {
    document.querySelector('.question h3').textContent = questions[questionNumber].title;
    document.querySelector('.question p').textContent = questions[questionNumber].question;
    document.querySelector('.question input').value = '';
};

const checkAnswer = function (question, answer) {
    if (question.status === 0 || question.status === 3) {
        if (!answer) return false;
        return answer.toLowerCase() === question.answer;
    }
};

const countDown = function () {
    let timeContainer = document.querySelector(".points-time .time");
    let seconds = parseInt(document.querySelector(".points-time .time").textContent);
    if (seconds === 0) {
        endGame();
        return;
    }
    seconds--;
    timeContainer.textContent = seconds.toString();
    countDownTimeout = setTimeout(countDown, 1000);
};

const resetGame = function () {
    location.reload();
};

const highlightLetter = function (letter, className) {
    letter.classList.add(className);
};

const findCurrentLetter = function(currentQuestion) {
    let letterElements = Array.prototype.slice.call(document.querySelectorAll('.abcdario li'));
    return letterElements.find(element => element.textContent.toLowerCase() === currentQuestion.letter);
};

sendButton.addEventListener('click', function (e) {
    e.preventDefault();
    let answer = document.querySelector("input").value;
    let question = questions[questionNumber];
    if (checkAnswer(question, answer)) {
        highlightLetter(findCurrentLetter(question), 'success');
        question.status = 1;
        points += 1;
    } else {
        highlightLetter(findCurrentLetter(question), 'fail');
        question.status = 2;
        errors += 1;
    }
    document.querySelector(".points").textContent = points;
    questionNumber += 1;
    nextQuestion();
});

nextButton.addEventListener('click', function (e) {
    e.preventDefault();
    let question = questions.splice(questionNumber, 1)[0];
    questions.push(question);
    question.status = 3;
    highlightLetter(findCurrentLetter(question), 'pass');
    nextQuestion();
});

newGameButton.addEventListener('click', function (e) {
    e.preventDefault();
    resetGame()
});

playButton.addEventListener('click', function (e) {
    e.preventDefault();
    welcomeContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    startGame();
});
