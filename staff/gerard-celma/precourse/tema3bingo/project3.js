var lineaCounter = 0;

function generateCard() {
    var card = [];
    while(card.length < 15) {
        var number = Math.floor((Math.random() * 30) +1);
        if (card.indexOf(number) == -1) {
            card.push(number);
        }
    }
    return card;
}

function displayCard(array) {
    var niceCard = (array[0]+ " " +array[1]+ " " +array[2]+ " " +array[3]+ " " +array[4]+
                    "\n" +array[5]+ " " +array[6]+ " " +array[7]+ " " +array[8]+ " " +array[9]+
                    "\n" +array[10]+ " " +array[11]+ " " +array[12]+ " " +array[13]+ " " +array[14]);
    return niceCard;                
}

function genNumber() {
    var number = Math.floor((Math.random() * 30) +1);
    return number;
}

function round(carton,roundCounter) {
    var numberRound = genNumber();
    if((roundCounter.indexOf(numberRound) == -1) && (carton.indexOf(numberRound) !== -1)) {
        roundCounter.push(numberRound);
        carton[carton.indexOf(numberRound)] = "X";
        if((carton[0] === "X" && carton[1] === "X" && carton[2] === "X" && carton[3] === "X" && carton[4] === "X") && (lineaCounter == 0)) {
            lineaCounter++;
            alert("¡Linea!");
        } else if((carton[5] === "X" && carton[6] === "X" && carton[7] === "X" && carton[8] === "X" && carton[9] === "X") && (lineaCounter == 0)) {
            lineaCounter++;
            alert("¡Linea!");
        } else if((carton[10] === "X" && carton[11] === "X" && carton[12] === "X" && carton[13] === "X" && carton[14] === "X") && (lineaCounter == 0)) {
            lineaCounter++;
            alert("¡Linea!");
        }
        alert("--> El " +numberRound+ 
                " <--\n\nFelicidades, el numero aparece en tu targeta: \n\n" +displayCard(carton));
    } else if((roundCounter.indexOf(numberRound) == -1) && (carton.indexOf(numberRound) == -1)) {
        roundCounter.push(numberRound);
        alert("--> El " +numberRound+ 
                " <--\n\nLo sentimos pero el numero no aparece en tu targeta: \n\n" +displayCard(carton));
    }
}


function bingo() {
    var player = prompt("¡Bienvenido al Bingo! \nIntroduce tu nombre para que nos dirigamos a tí.");
    if(player) {
        var carton = generateCard();
        var start = confirm("Hola " + player + ", aqui tienes tu cartón: \n\n" +displayCard(carton)+ "\n\n¿Quieres empezar a jugar?");
        if(start) {
            var roundCounter = [];
            while(carton.some(function(element) {return typeof element === 'number';})) {
                round(carton,roundCounter);
            }
            var replay = confirm("¡Bingo! Has completado el juego en " + roundCounter.length + " turnos. ¿Te gustaria volver a jugar?");
            if(replay) {
                lineaCounter = 0;
                bingo();
            }
        } else {
            alert("¡Hasta la vista!");
        }
    } else {
        alert("¡Hasta la vista!");
    }
}

bingo();