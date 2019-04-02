// Mini-Proyecto del tema 3
// BINGO GAME! 🎲🎰
// Realiza un programa que simule un Bingo. Cuando se ejecute, pedirá el nombre del jugador y deberá guardarse.
// Durante el primer turno se mostrará un cartón con 15 números (excluyendo el 0 siempre), 


// para pasar al siguiente turno el usuario deberá confirmar mediante confirm() visualizándose otro número,
// si coincide con alguno de los existentes en el cartón, cambiará por una "X" o un 0. El cartón se mostrará, 
// al final de cada turno, con los cambios efectuados, indicándole al usuario qué número se ha encontrado. 
// El programa deberá preguntar al usuario al inicio de cada turno si desea continuar, en caso de que se continúe, 
// seguirá el mismo patrón que hasta el momento.

// Por supuesto, cuando todos los números de una misma linea estén en "X", mostrará un mensaje "LINEA!", 
// pero la ejecución seguirá, el juego solo acabará cuando todos los números estén a "X".

// Cuando el juego concluya, deberá decirle al usuario en cuantos turnos se ha completado el cartón. 
// Por último, deberá preguntar si desea volver a jugar.
// Hint:
// Empieza por la versión más básica!


// funcion que pide el nombre
var getName = name => {
    do {
        var name = prompt("Introduzca su nombre");
        if (name == null) { return }
    } while (!isNaN(name))
    return name = name.trim().toUpperCase();
}
// funcion que imprime carton
var printCard = cardPrint => {
    console.log(`===== Bingo Card =====`);
    cardPrint.forEach(num => {
        if (typeof num === "string") {
            console.log(`${num}`);
        } else {
            console.log(`${num.join(" - ")}`);
        }
    })
    console.log(`======================`);
}

// funcion q genera numeros aleatorios no repetidos para el carton
var arrayCard = [];
function numCardRandom() {
    if (arrayCard.length === 0) {
        for (var i = 1; i <= 20; i++) { arrayCard.push(i) }
        arrayCard = arrayCard.sort(function () { return Math.random() - 0.5 });
    }
    return arrayCard.shift();
}

// funcion que genera el carton
function generatesCard() {
    var carton = [];
    for (var i = 0; i < 3; i++) {
        carton.push([numCardRandom(), numCardRandom(), numCardRandom(), numCardRandom(), numCardRandom()]);
    }
    return carton;
}

// funcion que genera numeros random 
var arrayNum = [];
function getNewNum() {
    if (arrayNum.length === 0) {
        for (var i = 1; i <= 20; i++) { arrayNum.push(i) }
        arrayNum = arrayNum.sort(function () { return Math.random() - 0.5 });
    }
    return arrayNum.shift();
}

// funcion que genera un nuevo carton
function newCards(card) {
    var newCard = true;
    while (newCard) {
        card = generatesCard();
        printCard(card);
        var newCard = confirm(`Te gustaria generar otro carton???`);
        if (!newCard) {
            return card;
        }
        arrayCard = [];
    }
}

// funcion que comprueba si el el numero se encuentra en el carton y si hay linea confirma turno 
function checkNumberInCard(checkCards, turnConfirm, shiftsnumber) {

    var linea = false;

    while (!linea || turnConfirm) {

        if (turnConfirm) {

            var numRandom = getNewNum();
            alert(`Se genero la bola # ${numRandom}`);
            console.log(`*******  ${numRandom}  *********`);

            shiftsnumber++;
            checkCards = checkCards.map(function (card) {
                if (card.join("") === "XXXXX") {
                    linea = true;
                    return "     Linea!!!   ";
                }
                return card.map(function (num) {
                    if (num == numRandom) {
                        return "X";
                    } else {
                        return num;
                    }
                })
            })
            printCard(checkCards);
            linea = checkCards.some(card => card.join("") === "XXXXX");
            if (linea) {
                alert(`     BINGO!!!   `);
                checkCards = checkCards.map(function (card) {
                    if (card.join("") === "XXXXX") {
                        linea = true;
                        return "     Linea!!!   ";
                    }
                    return card.map(function (num) {
                        if (num == numRandom) {
                            return "X";
                        } else {
                            return num;
                        }
                    })
                })
                return [checkCards, shiftsnumber];
            }

        } else {
            console.log('Chiaooooo!!!!');
            return alert(`Chiaoooo!!!!`);
        }
        var turnConfirm = confirm(`Nuevo turno \nDeseas sacar una nueva bola???`);
    }
    return;
}

function newGame() {
    bingoGame();
}

var rankingUsers = [];

// funcion orderar ranking
function rankingOrder(ranking) {
    return ranking.sort((a, b) => { return (a.numberShifts - b.numberShifts) });
}

// funcion imprimir ranking
function printRanking(ranking) {
    var num = 1;
    console.log(`========= Ranking ===============`);
    Object.keys(ranking).forEach(key => console.log(`${num++}º - Position ${ranking[key].name} - Turns ${ranking[key].numberShifts}`));
    console.log(`=================================`);
}

// funcion principal
function bingoGame() {
    var name = getName();
    var numberShifts = 0;
    if (name == null) { return alert(`Ciao!!!`) }
    alert(`${name}\nBienvenido al juego Bingo\nGeneramos su carton!!!`);
    var getCards = [];
    var cardboardBingo = newCards(getCards);
    console.log(`Ok elegiste este carton!!!`);
    printCard(cardboardBingo);
    alert('Reglas del Juego\nSi el numero se encuentra en el carton se tachara con una "X"\nSi completas la linea, completaras el Bingo.\nEntre menos turnos para completar el bingo,\nte posicionaras en primer lugar!!!!');
    var confirmTurn = confirm(`Empezamos el juego desea generar la primera bola???`);
    var bingoCard = checkNumberInCard(cardboardBingo, confirmTurn, numberShifts);
    console.log("     BINGO!!!    ");
    printCard(bingoCard[0]);
    numberShifts = bingoCard[1];
    rankingUsers.push({ name, numberShifts });
    var _newGame = confirm('Desea volver a jugar???');
    if (_newGame) {
        newGame();
    } else {
        var _rankingOrder = rankingOrder(rankingUsers);
        printRanking(_rankingOrder);
        return console.log(`Chiaooo!!!`);
    }

}
// llamada a la funcion principal
bingoGame()