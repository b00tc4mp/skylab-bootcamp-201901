let data = [
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

let playerName;
let previusPlayer;
let ronda;
let index;
let stopTime;
let rank = [];
//let questions;  --> para la version PRO cambiar por let data!!! y añadir la función chooseQuestions
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

function createLetters () {
    document.getElementsByTagName('footer')[0].insertAdjacentHTML("afterbegin", '<div hidden><div class="lettersgrid" id="letters"></div></div>')
    data.forEach(function (elem) {
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

    if (passQuestions() === 0) {
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
    setTimeout(function() {
        //Para inicializar el status de las preguntas
        data.forEach(elem => elem.status = 0);
        deleteStatusLetters();
        msg.className = '';
        msg.innerHTML = '';
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
    let seconds = 120;
    let game = setTimeout(() => finishGame(), 120000);
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