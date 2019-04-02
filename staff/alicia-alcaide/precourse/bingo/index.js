// Podrías intentar que sólo se cantara línea en la primera línea completada.  

const ROWS = 3;
const COLS = 5;
const NUMBALLS = 75;


function bingoGame() {
    var userName = prompt("Please enter your name to start playing bingo","");
    if (userName == null || userName == "") {
        window.alert ("Bye, see you soon.");
    }
    else {
        var play = true;
        while (play) {
            var ok = window.confirm(`Hi ${userName}! \nDo you want to start a new Bingo game?`);
            if (ok) {
                playBingo(userName);
            } else {
                play = false;
                window.alert (`Bye ${userName}, see you soon.`);
            };
        };
    };
};


function playBingo(userName) {
    var playGame = true;
    var displayCard = "";
    var ok = true;
    var turnNumbers = [];
    var bingoCard = createBingoCard();
    displayCard = messageBingoCard(bingoCard);
    ok = window.confirm(`This is your Bingo Card:\n${displayCard}\n\nDo you want to start the turn?`);
    if (ok) {
        var firstLine = false;
        while (playGame) {
            var number = getTurnNumber(turnNumbers);
            var sayNumber = matchNumInCard(number, bingoCard);
            if (!firstLine) {
                var sayLine = verifyIfLine(number, bingoCard);
            };
            var sayBingo = verifyIfBingo(bingoCard);
            displayCard = messageBingoCard(bingoCard);
            var message = "";
            if (sayNumber || sayLine || sayBingo) {
                message = "\nCongratulations " + userName + "!   You have..."
            };
            if (sayNumber) { message = message + "\n    the number: " + number }
               else        { message = message + "\nYou don't have the number: " + number };
            if (sayLine && !sayBingo)
                           { message = message + "\n      L I N E !!" 
                             firstLine = true;
                             sayLine = false;
                           };
            if (sayBingo)  { message = message + "\n    B  I  N  G  O !!!" };
            if (sayBingo)  {
                playGame = false;
                window.alert (`${displayCard}\n\n${message}`);
            } else {
                ok = window.confirm(`${displayCard}\n${message}\n\nNext turn?`);
                if (!ok) {
                    playGame = false
                    window.alert (`Ok, game cancelled!.`);
                };
            };
        };
    } else {
        window.alert (`Ok, game cancelled!.`);
    };
};


function getTurnNumber(turnNumbers) {
    var repeat = true;
    var number = 0;
    while (repeat) {
        number = getRandomInt(1, NUMBALLS);
        if (turnNumbers.indexOf(number) === -1) {
            turnNumbers.push(number);
            repeat = false;
        };
    };
    return number;
};


function matchNumInCard(number, bingoCard) {
    var posicion = findNumInCard(number, bingoCard);
    if (posicion.row >= 0 && posicion.col >= 0) {
        bingoCard[posicion.row][posicion.col].matched = true;
        return true;
    } else {
        return false;
    };
};


function verifyIfLine(number, bingoCard) {
    var line = true;
    var posicion = findNumInCard(number, bingoCard);
    if (posicion.row >= 0 && posicion.col >= 0) {
        for (var i=0; i<COLS; i++) {
            if (bingoCard[posicion.row][i].matched === false) {
                line = false
            };
        };
    } else {
        line = false;
    };
    return line;
};


function findNumInCard(number, bingoCard) {
    var position = {row : -1, col : -1};
    var find = false;
    var iRow = 0;
    var iCol = 0;
    while ( !find && (iRow < ROWS) ) {
        while ( !find && (iCol < COLS) ) {
            if (bingoCard[iRow][iCol].number === number) {
                find = true;
            } else {
                iCol++;
            };
        };
        if (!find) {
            iCol = 0;
            iRow++;
        };
    };
    if (find) {
        position.row = iRow;
        position.col = iCol;
    }
    return position;
};


function verifyIfBingo(bingoCard) {
    var matched = true;
    bingoCard.forEach(r => {r.forEach(c => {if (c.matched === false) matched = false})});
    return matched;
};


function messageBingoCard(bingoCard) {
    var message = "";
    bingoCard.forEach(r => {
        message = message + "\n     ";
        r.forEach(c => {message = message +
                        (c.matched ? " X" : toFixedLength(c.number,2,0))
                        + "     "});
    });
    return message;
};


function toFixedLength(input, length, padding) {
    padding = String(padding || "0");
    return (padding.repeat(length) + input).slice(-length);
};


function createBingoCard() {
    var arrayNumbers = createNumbersForCard();
    var array = new Array(ROWS);
    for (var i = 0; i < ROWS; i++) {
        array[i] = new Array(COLS);
    };
    var ind = 0;
    for (var r = 0; r < ROWS; r++) {
        for (var c = 0; c < COLS; c++) {
            array[r][c] = {number : arrayNumbers[ind], matched: false};
            ind++;
        };
    };
    return array;
};


function createNumbersForCard() {
    var arrayNumbers = new Array(ROWS * COLS);
    for (var index = 0; index < (ROWS * COLS); index++) {
        var repeat = true;
        while (repeat) {
            var number = getRandomInt(1, NUMBALLS);
            if (arrayNumbers.indexOf(number) < 0) {
                arrayNumbers[index] = number;
                repeat = false;
            };
        };
    };
    return arrayNumbers;
};


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};



bingoGame();


