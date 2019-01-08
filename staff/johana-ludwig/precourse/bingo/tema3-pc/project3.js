let playerName = '';
let attempts = 0;
let boardWidth = 5;
let boardHeight = 3;
let bingoCard = [
    { number: 1, matched: false },
    { number: 3, matched: false },
    { number: 5, matched: false },
    { number: 1, matched: false },
    { number: 1, matched: false },

    //next line
    { number: 5, matched: false },
    { number: 1, matched: false },
    { number: 1, matched: false },
    { number: 1, matched: false },
    { number: 1, matched: false },

    //next line
    { number: 1, matched: false },
    { number: 2, matched: false },
    { number: 4, matched: false },
    { number: 1, matched: false },
    { number: 1, matched: false },
];

function generateRandomNumber() {
    return Math.floor(Math.random() * 5) + 1;
}

function askTurn() {
    if (isCartonCompleted()) {
        return false;
    };
    
    let askPlayer = confirm("¿Quieres que el bombo extraiga un número?"); 
    
    if (askPlayer == true) {
        newTurn(); 
        
    } else {
        document.write('Has cancelado el juego! Vuélvelo a intentar');

        return false;
    }
    return true;    
}

function newTurn() {
    let randomNumber = generateRandomNumber();

    addBomboToList(randomNumber);

    for (let i = 0; i < bingoCard.length; i++) {
        if (bingoCard[i].number === randomNumber) {
            bingoCard[i].number = 'X';
            bingoCard[i].matched = true;
        }
    }
    updateBingoCard();
    checkForLines();
    checkForCompleted();
}

function initalizeGame() {
    // Setup HTML
    document.write('<h1>BINGO - Skylab</h1>');
    // Setup BingoCard Table
    document.write('<table id="bingoBoard"></table></br>');
    document.write('<button onClick="askTurn()">Clic para jugar!</button>');
    document.write('<p>El bombo ha extraido:</p>');
    document.write('<ul id="bomboNumbers"></ul>');
    updateBingoCard();
}

function initializePlayer() {
    playerName = prompt('Por favor, introduce tu nombre');
}

function isCartonCompleted() {
    let result = true;
    for (let i = 0; i < bingoCard.length; i++) {
        if (bingoCard[i].matched === false) {
            result = false;
            break;
        } 
    }
    return result;
}

function checkForLines() {
    for (let col = 0; col < boardWidth; col++) {
        if (lineVertical(col) === true) {
            console.log(`¡Línea! En la columna: ${col}`)
        }
    }

    for (let row = 0; row < boardHeight; row++) {
        if (lineHorizontal(row) === true) {
            console.log(`¡Línea! En la fila: ${row}`)
        }
    }
}

function updateBingoCard() {
    let bingoBoardTable = document.getElementById("bingoBoard");    
    // Clear board
    bingoBoardTable.innerHTML = '';

    for (let i = 0; i < boardHeight; i++) {
        let row = bingoBoardTable.insertRow();
        
        for (let j = 0; j < boardWidth; j++) {
            let cell = row.insertCell();
            cell.innerHTML = bingoCard[i*boardWidth+j].number;
           
        }
    }
}

function addBomboToList(number) {
    let bomboList = document.getElementById("bomboNumbers");
    attempts++;
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(number));
    bomboList.appendChild(li);
}

function checkForCompleted() {
    if (isCartonCompleted()) {
        document.write(`¡Bingo! ${playerName.toUpperCase()}, 
        has completado el cartón en ${attempts} turnos. ¡Enhorabuen!`)
    }  
}

function lineVertical(col) {
    for (let row = 0; row < boardHeight; row++) {
        if (bingoCard[calcIdx(row, col)].matched === false) {
            return false;
        }
    }

    return true;
}

function lineHorizontal(row) {
    for (let col = 0; col < boardWidth; col++) {
        if (bingoCard[calcIdx(row, col)].matched === false) {
            return false;
        }
    }   
    
    return true;
}

function calcIdx(row, col) {
    return row * boardWidth + col;
}

function bingo() {
    initializePlayer();
    initalizeGame();
}

bingo()