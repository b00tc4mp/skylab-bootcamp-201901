// Buen código y bien organizado! Lo único que te diría es que plantearas la posibilidad de que al acabar la partida el usuario pueda volver a jugar. 

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


var ranking = [
    {name: "Natalia", correctLetters: 20},
    {name: "Julia", correctLetters: 27},
    {name: "Juan", correctLetters: 18},
    {name: "Marc", correctLetters: 26},
    {name: "Jaime", correctLetters: 24},
    {name: "Susana", correctLetters: 22}
];


function pasapalabraGame() {
    var userName = prompt("Por favor entra tu nombre para empezar el juego del Pasapalabra.","");
    if (userName == null || userName == "") {
        window.alert (`Has cancelado el juego.\nHasta pronto.`);
    } 
    else {
        var play = true;   
        while (play) {
            var ok = window.confirm(`Hola ${userName}! \nQuieres empezar el pasapalabra?`);
            if (ok) {
                var playFinished = playPasapalabra(userName);  
                if (playFinished) {
                    showRanking();
                };
            } else {
                play = false;
                window.alert (`Adiós ${userName}, hasta pronto.`);
            };    
        };
    };   
};


function playPasapalabra(userName) {
    var playGame = true;
    var actQIndex = 0;
    var playFinished = false;

    questions.forEach(q => {q.status = 0});

    while (playGame) {
        actQIndex = nextQuestion(actQIndex);
        if (actQIndex < questions.length) {
            var message = messageNextQuestion(actQIndex);
            var answer = prompt(message,"");
            if (answer == null) {
                window.alert (`Has cancelado el juego.\n\nHasta pronto ${userName}.`);
                playGame = false;
            } else {
                if (answer !== "") {
                    if (answer.toLowerCase().trim() == 'pasapalabra') {
                        actQIndex ++;
                    } else {
                        var correctAnswer = checkAnswer(actQIndex, answer);
                        if (correctAnswer) {
                            window.alert (`${userName}, respuesta correcta.`);
                        } else {
                            window.alert (`${userName}, respuesta incorrecta.`);
                        };
                        actQIndex ++;
                    };
                };
            };
        } else {
            playGame = false;
            playFinished = true;
        };
   };

   if (playFinished) {
       var [correctLetters, wrongLetters] = userResults();
       saveRanking(userName, correctLetters);
       var rankingMessage = showRanking();
       window.alert (`${userName},\n Has dicho correctamente ${correctLetters} letras.\n Y has fallado ${wrongLetters} letras.\n\n ${rankingMessage}`);
   };
   return playFinished;
};


function nextQuestion(actQIndex) {
    var repeat = true;
    var index = actQIndex;
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


function messageNextQuestion(actQIndex) {
    return questions[actQIndex].question;
};


function checkAnswer(actQIndex, answer) {
    var correctAnswer = answer.toLowerCase().trim() == questions[actQIndex].answer;
    if (correctAnswer) {
        questions[actQIndex].status = 1;
    } else {
        questions[actQIndex].status = 2;
    };
    return correctAnswer;
};


function userResults() {
    var correctLetters = 0;
    var wrongLetters = 0;
    questions.forEach(q => {
        if (q.status === 1) {
            correctLetters++;
        }
        if (q.status === 2) {
            wrongLetters++;
        }
    });
    return [correctLetters, wrongLetters]
};


function saveRanking(userName, numLetters) {
    ranking.push({name: userName, correctLetters: numLetters});
};


function showRanking() {
    var sortR = sortRanking();
    var message = "El ranking final de Pasapalabra queda así:\n";
    sortR.forEach(r => {
        message = message + "\n" + r.name + " con " + r.correctLetters + " letras acertadas";
    });
    return message;
};


function sortRanking() {
    return ranking.sort( (a, b) => {
        if (a.correctLetters > b.correctLetters) {
          return -1;
        }
        if (a.correctLetters < b.correctLetters) {
          return 1;
        }
        return 0;
    });
};


pasapalabraGame();