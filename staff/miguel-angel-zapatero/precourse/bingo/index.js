/* Realiza un programa que simule un Bingo. Cuando se ejecute, pedirá el nombre del jugador y deberá guardarse. Durante el primer turno se mostrará un cartón con 15 números (excluyendo el 0 siempre), para pasar al siguiente turno el usuario deberá confirmar mediante confirm() visualizándose otro número, si coincide con alguno de los existentes en el cartón, cambiará por una "X" o un 0. El cartón se mostrará, al final de cada turno, con los cambios efectuados, indicándole al usuario qué número se ha encontrado. El programa deberá preguntar al usuario al inicio de cada turno si desea continuar, en caso de que se continúe, seguirá el mismo patrón que hasta el momento.

Por supuesto, cuando todos los números de una misma linea estén en "X", mostrará un mensaje "LINEA!", pero la ejecución seguirá, el juego solo acabará cuando todos los números estén a "X".

Cuando el juego concluya, deberá decirle al usuario en cuantos turnos se ha completado el cartón. Por último, deberá preguntar si desea volver a jugar. */

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

// Function para crear bombo.
function createBombo() {
    let arr = [];
    for (let i = 1; i <= 90; i++) {
        arr.push(i);
    }
    return arr;
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

// Function para comprobar si el número sacado existe en el cartón. 
function checkNumCard(card, num) {
    return card.some(function(elem){
        return elem.number === num;
    });
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
        return elem.mathed === false;
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

function bingo() {

    // Declaramos el nombre del usuario mediante prompt
    let userName = prompt("Player's name:");
    console.log(`Hello ${userName}!`);

    // Declaramos el bombo del Bingo mediante la función de crear Bombo.
    let bombo = createBombo();

    // Declaramos el cartón del Bingo mediante la función de crear cartón. --> Hacer que pregunte si se queda con el cartón o quiere otro en la version PRO.
    let card = createCard();
    console.log(showCard(card));

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
            console.log('LINE in ' + turn + ' turns!');
        }

        if(!checkBingo(card)) {
            console.log('BINGO in ' + turn + ' turns!');
            return playAgain();
        }
        confirmTurn = askTurn();
    }
    return 'You lose in turn ' + turn + '!';
}

bingo();