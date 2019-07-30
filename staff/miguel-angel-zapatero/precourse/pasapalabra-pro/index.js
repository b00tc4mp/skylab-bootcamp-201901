//El programa no debería hacer distinciones entre mayúsculas, minúsculas... Ejemplo: "animal" == "ANIMAL" // "Animal" // "aNiMal"...

//El programa debe estar preparado para aceptar el input "END" para terminar el juego en cualquier momento, si esto sucede, el programa dirá cuantas letras ha acertado pero no entrará en el ranking.

//Prepara tu programa para que no repita siempre las mismas preguntas, por ejemplo, de la misma letra, se podrían hacer tres preguntas diferentes.
let ranking;
let questions = [
    { letter: "a", data: [
        {answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
        {answer: "anormal", status: 0, question: "CON LA A. Dicha persona que no es normal"},
        {answer: "alma", status: 0, question: "CON LA A. Entidad inmaterial que poseen los seres vivos según creencias religiosas o perspectivas filosoficas"},
    ]},
    { letter: "b", data: [
        {answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
        {answer: "baba", status: 0, question: "CON LA B. Substancia biscosa que deja el caracol y los bebes"},
        {answer: "bigote", status: 0, question: "CON LA B. Pelo que crece en la región de la cara entre el labio superior y la nariz"},
    ]},
    { letter: "c", data: [
        {answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé"},
        {answer: "capa", status: 0, question: "CON LA C. Objeto que Superman llevaba en la espalda"},
        {answer: "GameCube", status: 0, question: "CONTIENE LA C. Consola fabricada por Nintendo sucesora de la Nintendo 64"},
    ]},
    { letter: "k", data: [
        {answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"},
        {answer: "kata", status: 0, question: "CON LA K. Serie, forma o secuencia de movimientos establecidos que se pueden practicar tanto en solitario como en parejas"},
        {answer: "kiwi", status: 0, question: "CON LA K. Fruta verde, que esta más buena su versión amarilla o Gold"},
    ]},
];

function chooseQuestions(questions) {
    let result = questions.map(function(elem) {
        let i = Math.floor(Math.random() * elem.data.length);
        let myObj = {
            letter: elem.letter, 
            answer: elem.data[i].answer, 
            status: elem.data[i].status, 
            question: elem.data[i].question};
        return myObj;
    }) 
    return result;
}

function showQuestion(data, ronda) {
    let result = prompt('Ronda ' + ronda + ':\n' + data.question);
    return result;
}

function goodAnswers(data) {
    return data.filter(elem => elem.status == 1).length;
}

function badAnswers(data) {
    return data.filter(elem => elem.status == -1).length;
}

function passQuestions(data) {
    return data.filter(elem => elem.status == 0);
}

// Función para crear ranking
function makeRanking(name, num) {
    return {playerName: name, points: num}
}

// Función para mostrar ranking
function showRanking(data) {
    let msg = '';
    orderRanking(data);
    data.forEach(function(elem, i){
        msg += `${i+1}: ${elem.playerName} ------> ${elem.points} POINTS\n`;
    });
    return msg;
}

// Función para ordenar el ranking por puntos
function orderRanking(data) {
    return data.sort((a, b) => b.points - a.points);
}

//Función para pedir el nombre del jugador.
function playerName() {
    let name;
    do {
        name = prompt("Nombre del jugador?");
    } while (!name);
    console.log(`Hola ${name}, comienza el juego!`);
    return name;
}

function playAgain(data) {
    if (confirm('Play again?')) {
        return pasapalabra(data);
    } else {
        return 'Goodbye, see you again!';
    }
}

function showResult(player, data){
    return `${player}: ${goodAnswers(data)} correcta/s - ${badAnswers(data)} fallada/s`;
}

function pasapalabra(data) {
    let player = playerName();
    let ronda = 1;
    let stopGame = 0;
    let questions = chooseQuestions(data);

    //Asignamos un valor a la variable ranking(global) sólo si no esta definida. 
    if (typeof ranking === 'undefined') {
        ranking = [];
    }

    while (passQuestions(questions).length > 0) {
        console.log('Ronda ' + ronda);
        let passQ = passQuestions(questions);
        passQ.forEach(function(elem, i){
            let answer = showQuestion(elem, ronda).toUpperCase();
            let letter = elem.letter;
            let index = questions.findIndex(elem => elem.letter == letter);
            if (answer == elem.answer.toUpperCase()) {
                questions[index].status = 1;
                console.log('CORRECTO! +1 PUNTO');
            } else if (answer != 'PASAPALABRA' && answer != 'END') {
                questions[index].status = -1;
                console.log('ERROR!');
            } else {
                if(answer == 'END') {
                    passQ.splice(i+1);
                    stopGame++;
                } else {
                    console.log('PASAPALABRA');
                }           
            }
        });
        
        if (stopGame == 1) {
            console.log(showResult(player, questions));
            return playAgain(data);
        }
        ronda++;
    }
    console.log(showResult(player, questions));
    ranking.push(makeRanking(player, goodAnswers(questions)));
    console.log(showRanking(ranking));

    return playAgain(data);
}

pasapalabra(questions);