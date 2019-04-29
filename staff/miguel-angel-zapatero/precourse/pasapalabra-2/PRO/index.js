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

let playerName;
let previusPlayer;
let ronda;
let index;
let stopTime;
let endGame //Para la versión PRO;
let rank = [];
let data = []; //Para la versión PRO
let btnPlay = document.getElementById('play');
let btnAnswer = document.getElementById('ok');
let btnAgain = document.getElementById('again');
let btnCancel = document.getElementById('cancel');
let btnPass = document.getElementById('pass');
let inputAnswer = document.getElementById('answer');
let question = document.getElementById('question');
let msg = document.getElementById('message');
let inputName = document.getElementById('name');
let ranking = document.getElementById('ranking');
let msgTime = document.getElementById('msgtime');


//Función para elegir las preguntas aleatoriamente de cada letra (si tuvieramos más preguntas)
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

function createLetters () {
    document.getElementsByTagName('footer')[0].insertAdjacentHTML("afterbegin", '<div hidden><div class="lettersgrid" id="letters"></div></div>')
    questions.forEach(function (elem) { //--> en la version PRO se cambia data por questions
        document.getElementById('letters').insertAdjacentHTML("beforeend", `<div class="letters" id="${elem.letter}"><p>${elem.letter.toUpperCase()}</p></div>`);
    });
}

function deleteRanking () {
    //borrar todos los items que tengan class = rankitems
    let items = document.querySelectorAll('.rankitems');
    for (let item of items) {
        item.remove();
    }
}

function createRanking (data) {
    let i = 1;
    deleteRanking();
    data.forEach(function (elem) {
        let strHTML = '';
        strHTML += `<div class="rankitems"><p>${i}º</p></div>`;
        strHTML += `<div class="rankitems"><p>${elem.playerName}</p></div>`;
        strHTML += `<div class="rankitems"><p>${elem.puntos}</p></div>`;
        strHTML += `<div class="rankitems"><p>${elem.correctas}</p></div>`;
        strHTML += `<div class="rankitems"><p>${elem.falladas}</p></div>`;
        document.getElementsByClassName('rankgrid')[0].insertAdjacentHTML("beforeend", strHTML);
        i++;
    });
}

function addRanking (name, good, bad) {
    let points = (good * 10) - (bad * 5);
    if (points > 0) {
        return {playerName: name, puntos: points, correctas: good, falladas: bad}
    }
}

function orderRanking(data) {
    return data.sort((a, b) => b.puntos - a.puntos);
}

function setName() {
    return inputName.value;
}

function showQuestion() {
    let letter = document.getElementById(`${data[index].letter}`);
    // Declarar variable para saber que letra 'activa' era la anterior
    let previus = letter.previousElementSibling || letter.parentElement.lastElementChild;
    if (passQuestions() > 0) {
        if (data[index].status !== 0) {
            previus.classList.remove('select');
            accIndex();
            return showQuestion();
        }
        previus.classList.remove('select');
        letter.classList.add('select');

        //Creamos el item para la pregunta
        let p = document.createElement('p');
        p.className = "flow-text";
        p.innerHTML = data[index].question;
        question.firstChild.replaceWith(p);
        inputAnswer.value = '';
        inputAnswer.focus();
    } else {
        finishGame();
    }
}

function answerQuestion() {
    let answer = inputAnswer.value;
    let letter = document.getElementById(`${data[index].letter}`);
    if (answer) {
        if (answer.toUpperCase() === data[index].answer.toUpperCase()) {
            data[index].status = 1;
            letter.classList.add('good');
            showQuestion();
        } else if (answer.toUpperCase() === 'END') {
            endGame = true;
            finishGame();
        } else {
            data[index].status = -1;
            letter.classList.add('bad');
            showQuestion();
        }
    }
}

function passQuestion() {
    accIndex();
    showQuestion();
}

function passQuestions() {
    return data.filter(elem => elem.status == 0).length;
}

function goodAnswers() {
    return data.filter(elem => elem.status == 1).length;
}

function badAnswers() {
    return data.filter(elem => elem.status == -1).length;
}

// Función para acumular y reiniciar el contador del indice de las preguntas.
function accIndex() {
    index++;
    if (index > data.length - 1) {
        index = 0;
        ronda++;
        document.getElementById('ronda').firstElementChild.innerHTML = 'Ronda ' + ronda;
    }
}

function deleteStatusLetters() {
    let items = document.getElementsByClassName('letters');
    for (let item of items) {
        item.className = 'letters';
    }
}

function finishGame() {
    let good = goodAnswers();
    let bad = badAnswers();
    let message = `${playerName} has acertado ${good} pregunta/s y has fallado ${bad}`;
    stopTime = true;
    msgTime.hidden = true;
    msg.innerHTML = message;
    if (good > bad) {
        msg.classList.add('good');
    } else {
        msg.classList.add('warning');
    }

    if (!endGame) { //en la version PRO he cambiado la manera de añadir en el ranking cuando se acaba el tiempo. (se podría restar puntos por acabarse el tiempo).
        let rankItem = addRanking(playerName, good, bad);
        if (rankItem) {
            rank.push(addRanking(playerName, good, bad));
            orderRanking(rank);
            createRanking(rank);
        }
    }

    document.getElementById('playagain').hidden = false;
    document.getElementById('inputanswer').hidden = true;
    document.getElementById('letters').parentElement.hidden = true;
    document.getElementById('ranking').hidden = false;
}

function newPlayer() {
    previusPlayer = '';
    inputName.value = '';
    inputAnswer.value = '';
    msg.className = '';
    msg.innerHTML = '';
    document.getElementById('inputname').hidden = false;
    document.getElementById('playagain').hidden = true;
}

function playAgain() {
    document.getElementById('playagain').hidden = true;
    startGame();
}

function startGame() {
    let time = 0;
    playerName = setName();
    if (!playerName) {
        msg.innerHTML = "Por favor, introduzca un nombre."; 
        msg.classList.add('warning');
        return;
    }
    if (playerName !== previusPlayer) {
        time = 3000;
        previusPlayer = playerName;
        msg.className= 'select';
        msg.innerHTML = `Bienvenido ${playerName}, que comience el juego!`;
        document.getElementById('inputname').hidden = true;

    }
    data = chooseQuestions(questions);    
    setTimeout(function() {
        //Para quitar la los estilos de las letras
        deleteStatusLetters();
        msg.className = '';
        msg.innerHTML = '';
        endGame = false;
        index = 0;
        ronda = 1;
        stopTime = false;
        document.getElementById('ronda').firstElementChild.innerHTML = 'Ronda ' + ronda;
        document.getElementById('inputanswer').hidden = false;
        document.getElementById('letters').parentElement.hidden = false;
        document.getElementById('ranking').hidden = true;
        showTime();
        showQuestion();
    }, time);
}

function showTime() {
    let seconds = 30;
    let game = setTimeout(() => finishGame(), 30000);
    let time = setInterval(accTime, 1000);
    msgTime.hidden = false;
    msgTime.innerHTML = "Tiempo: " + seconds + " segundo/s";
    function accTime() {
        seconds--;
        msgTime.innerHTML = "Tiempo: " + seconds + " segundo/s"
        if(passQuestions() === 0 || stopTime) {
            clearInterval(time);
            clearTimeout(game);
        }
    }
}

function bindingKeys(event) {
    var x = event.charCode || event.keyCode;
    if (!document.getElementById('inputanswer').hidden) {
        switch (x) {
            case 13:
                answerQuestion();
                break;
            case 17:
                passQuestion();
                break;
            default:
                break;
        }
    }
}

createLetters();
btnPlay.addEventListener("click", startGame);
btnAgain.addEventListener("click", playAgain);
btnCancel.addEventListener("click", newPlayer);
btnAnswer.addEventListener("click", answerQuestion);
btnPass.addEventListener("click", passQuestion);