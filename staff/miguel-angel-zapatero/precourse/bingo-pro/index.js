/* 
-> Cuando se muestre la carta, se preguntará al usuario si realmente quiere ese cartón o generar otro, si realmente quiere ese cartón, deberá responder "yes" para proceder.
-> Establece un sistema de puntos, en cuantos más turnos se complete el cartón, menos puntos (el sistema de puntos intégralo como quieras), por el contrario, a menos turnos, más puntos.
-> Antes de empezar el juego, muestra el sistema de puntos al usuario.
-> Ranking de usuarios (ordenado por puntos). 
*/

// Función para crear el cartón del Bingo.
function createCard() {
    let card = [];
    for (let i = 1; i <= 15; i++) {
        let x = true;
        let num = 0;
        while(x) {
            num = randomNum();
            x = checkNumCard(card, num);
        }
        card.push({number: num, mathed: false})
    }
    return card;
}

// Function para comprobar si un número existe en el cartón. 
function checkNumCard(card, num) {
    return card.some(function(elem){
        return elem.number === num;
    });
}

// Función para decidir si quedarse con el cartón
function chooseCard() {
    let option, card;
    do {
        card = createCard();
        console.log(showCard(card));
        option = prompt('Do you want this card? yes/no');
    } while(option != 'yes')
    return card;
}

// Función para mostrar el cartón del Bingo
function showCard(card) {
    let result = '';
    card.forEach(function(elem, i){
        result += `[${elem.number}]`;
        if ((i+1) % 5 == 0) {
            result += '\n';
        }
    });
    return result;
}

// Función para crear bombo.
function createBombo() {
    let arr = [];
    for (let i = 1; i <= 90; i++) {
        arr.push(i);
    }
    return arr;
}

// Función que saca una bola existente en el bombo
function getBall(data) {
    let numBall = randomNum();
    let index = data.indexOf(numBall);
    if (index != -1) {
        data.splice(index, 1);
        return numBall;
    } else {
        return getBall(data);
    }
}

// Función para mostar la bola.
function showBall(num) {
    return "The ball's number is " +  num;
}

// Función para generar los números aleatorios del 1 al 90.
function randomNum() {
    return Math.ceil(Math.random()* 90);
}

// Función para preguntar si quieres otro turno.
function askTurn() {
    return confirm('Next turn?'); 
}

// Función para comprobar si hay una linea hecha.
function checkLine(card) {
    let arr = [];
    let acc = 0;
    card.forEach(function(elem, i){
        if(elem.mathed == true) acc++;
        if((i+1) % 5 == 0) {
            arr.push(acc);
            acc = 0;
        }
    });
    
    return arr.some(function(elem){
        return elem === 5;
    });
}

// Función para comprobar si el cartón está completo.
function checkBingo(card) {
    return card.some(function(elem){
        return elem.mathed === false
    });
}

// Función para encontrar el indice del número sacado en el cartón.
function findNumCardIndex(card, numBall) {
    return card.findIndex(elem => elem.number == numBall);
}

//Función para preguntar si se vuelve a jugar.
function playAgain() {
    if (confirm('Play again?')) {
        return bingo();
    } else {
        return 'Goodbye, see you again!';
    }
}

// Función para gestionar los puntos al cantar linea
function linePoints(num, line) {
    let points = 0;
    if (line && num < 88) {
        points = (88 - num) * 500;
    }
    return points;
}

// Función para gestionar los puntos al cantar linea
function bingoPoints(num) {
    return (90 - num) * 780;
}

// Función para mostrar sistema de puntos
function showSystemPoints() {
    let msg = '';
    msg += 'MAX POINTS ---> 100.000\n\n';
    msg += 'BINGO POINTS:\n';
    msg += '15 <= Every turn < 90 ---> 780 POINTS\n\n';
    msg += 'LINE POINTS:\n';
    msg += '5 <= Every turn < 88 ---> 500 POINTS\n\n'
    msg += '0 POINTS no ranking!';
    return msg;
}

// Función para crear ranking
function makeRanking(name, num) {
    return {userName: name, points: num}
}

// Función para mostrar ranking
function showRanking(data) {
    let msg = '';
    orderRanking(data);
    data.forEach(function(elem, i){
        msg += `${i+1}: ${elem.userName} ------> ${elem.points} POINTS\n`;
    });
    return msg;
}

// Función para ordenar el ranking por puntos
function orderRanking(data) {
    return data.sort((a, b) => b.points - a.points);
}

function bingo() {
    console.log(showSystemPoints());

    // Declaramos el nombre del usuario mediante prompt
    let userName = prompt("Player's name:");
    console.log(`Hello ${userName}!`);

    // Declaramos el bombo del Bingo mediante la función de crear Bombo.
    let bombo = createBombo();

    // Declaramos el cartón del Bingo mediante la función de crear cartón.
    let card = chooseCard();
    
    // Declaramos el ranking sólo si no existe
    if (typeof ranking === 'undefined') {
        ranking = [];
    }

    // Inicializamos variables
    let points = 0;
    let confirmTurn = true;
    let turn = 0;
    let line = false;
    let numBall = 0; 
    while(confirmTurn) {
        turn++;
        numBall = getBall(bombo);
        console.log(showBall(numBall));
        
        if(checkNumCard(card, numBall)) {
            index = findNumCardIndex(card, numBall);
            card[index].number = 'X';
            card[index].mathed = true;
            console.log(showCard(card));
        }

        if(checkLine(card) && line != checkLine(card)) {
            line = true;
            points += linePoints(turn, line);
            console.log(`LINE in ${turn} turns! => ${points} POINTS`);
        }

        if(!checkBingo(card)) {
            points += bingoPoints(turn);
            if (points != 0) {
                ranking.push(makeRanking(userName, points));
            }
            console.log(`BINGO in ${turn} turns! => ${points} POINTS`);
            console.log(showRanking(ranking));
            return playAgain();
        }
        confirmTurn = askTurn();
    }
    return 'You lose in turn ' + turn + '!';
}

bingo();