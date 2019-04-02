main();

function main() {

let questions = [
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


userInteractionInterface(questions);


}

function userInteractionInterface(questions) {

    let strWellcomeMsg, strOptionsMsg;
    let wordCorrectAswered, wordPassed, wordFailed, wordUndone, gameStatus,gameStatusLose,
     gameStatusUncompleted, gameStatusWin, gameIsOver, nextWord, endTheGame;
    wordCorrectAswered = 1;
    wordPassed = 2;
    wordFailed = 3;
    wordUndone = 0;
    
    gameStatusUncompleted = -1;
    gameStatusWin = 1;
    gameStatusLose = 2;
    gameStatus = -1;
    gameIsOver = false;

    nextWord = 'pasapalabra';
    endTheGame = 'end';

    strWellcomeMsg = '*** Bienvenido a pasapalabra **** \n  + Introduce tu nombre de jugador:';
    strOptionsMsg = '  * OPCIONES * \n + Introducir la respuesta ' + 
    '\n + Introducir la palabra clave "pasapalabra" para pasar a la siguiente pregunta ' + 
    '\n + Introducir la palabra clave "END" para salir del juego'

    let userName = prompt(strWellcomeMsg);
    alert('+ Hola ' + userName + ', comienza el juego!!!!');
    console.log(userName);

    let continueGame = true;
    let count = 0;
    let userAnswer = '';
    let questionOptions = '';


    while (continueGame) {
            if(questions.length === count) {
                gameIsOver = checkGameStatus(questions, count, wordFailed, wordCorrectAswered,
                 gameStatus, gameStatusLose, gameStatusUncompleted, gameStatusWin);
                count = 0;
            }
            if(!gameIsOver){

                if(questions[count].status !== wordFailed && questions[count].status !== wordCorrectAswered){
                    userAnswer = displayQuestions(questions, strOptionsMsg, count);

                    switch (userAnswer) {
                        case questions[count].answer:
                            questions[count].status = wordCorrectAswered;
                            alert('* Respuesta acertada¡¡¡ ;)');
                            break;                    
                        case endTheGame:
                            alert('+ Gracias por jugar a pasapalabra, hasta pronto ;) ');
                            continueGame = false;
                            break;
                        case nextWord:
                            questions[count].status = wordPassed;
                            alert('+ Pasamos a la siguinete pregunta');
                            break;
                        default:
                            questions[count].status = wordFailed;
                            alert('* Respuesta equibocada...');
                            break;
                    }
                }
                    (questions.length > count) ? count++ : count = 0; 
            } else {
                continueGame = false;
            }
        } 
    }


function checkGameStatus(questions, count, wordFailed, wordCorrectAswered, gameStatus, 
                            gameStatusLose, gameStatusUncompleted, gameStatusWin){
    var strDisplayScore = '';
    gameStatus = checkGameStatusWin(questions, wordCorrectAswered, 
                                        gameStatusUncompleted, gameStatusWin, gameStatus);

    if(gameStatus !== gameStatusWin){
         gameStatus = checkGameStatusLose(questions, wordFailed, gameStatusUncompleted, 
                                                gameStatusLose, gameStatus, wordCorrectAswered);
    }
   

    switch (gameStatus) {

        case gameStatusLose:
                strDisplayScore = displayGameScore(questions);
                let continueAfterLose = confirm('* Lo sentimos no has podido acabar el rosco :( ' + strDisplayScore + ' + Deseas seguir jugando?');
                if(!continueAfterLose){
                alert('+ Gracias por jugar a pasapalabra, hasta pronto ;) ');
                return true;
                } else {
                    resetGame(questions);
                }
            break;
        case gameStatusWin:
                strDisplayScore = displayGameScore(questions);
                let continueAfterGameOver = confirm('+ HAS GANADADO EL ROSCO, FELICIDADES!!!! :) ' + strDisplayScore +' + Deseas seguir jugando?');
                if(!continueAfterGameOver){
                alert('+ Gracias por jugar a pasapalabra, hasta pronto ;) ');
                return true;
                } else {
                    resetGame(questions);
                }
            break;
            default:
                return false;
                break;

    }


}

 function checkGameStatusLose(questions, wordFailed, gameStatusUncompleted, gameStatusLose,
                                                             gameStatus, wordCorrectAswered) {
    if(gameStatus === gameStatusUncompleted){

    let gameIsLose = questions.every(function(element) {
        if(element.status === wordFailed || element.status === wordCorrectAswered){
            return true;
        } else {
            return false;
        }
    });
    return gameIsLose ? gameStatusLose : gameStatusUncompleted;
    } else {
        return gameStatus;
    } 
}

function checkGameStatusWin(questions, wordCorrectAswered, gameStatusUncompleted, 
                                                        gameStatusWin, gameStatus) {
    if(gameStatus === gameStatusUncompleted){
        let gameIsWin = questions.every(function(element) {
            if(element.status === wordCorrectAswered){
                return true;
            } else {
                return false;
            }
        });
        return gameIsWin ? gameStatusWin : gameStatusUncompleted;
    } else {
        return gameStatus;
    }
}


function resetGame(questions, count){
    for(var i = 0; i < questions.length; i++){
        questions[i].status = 0;    
    }
}

function displayQuestions(questions, strOptionsMsg, count){
        let questionOptions = strOptionsMsg + '\n  -------  \n' + ' - Siguiente pregunta: \n ' + questions[count].question;
        let userAnswerInput = prompt(questionOptions);
        if(userAnswerInput === '' ){
            alert('* Por favor introduce una restpuesta una restpuesta... ');
            return displayQuestions(questions, strOptionsMsg, count);
        }
        return userAnswerInput.toLowerCase().trim();
}

function displayGameScore(questions) {
    let answersRigthTotal = 0;
    let answersWrongTotal = 0;
    let strTotalScore = '';
    questions.forEach(function(element) {
        (element.status === 1) ? answersRigthTotal++ : answersWrongTotal++;
    });

    strTotalScore = '\n + Tu puntuación total es: \n' + ' ' + answersRigthTotal + 
                    ' --> Respuestas correctas \n ' + answersWrongTotal + ' --> Respuestas fallidas\n';
    return strTotalScore;
}