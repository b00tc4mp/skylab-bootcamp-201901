function bingo () {

function playersName (){

let playersName = prompt("Please enter your name", "Username");
};

playersName();

let card = [];
let number = [];
let countLine = 0;

function generateCard () {
	let i = 1;
	while (i <= 15) {
	let numCard = Math.floor((Math.random()*100)+1);
		if (!card.includes(numCard)){
		card.push(numCard); 
		i++;
		}
	};
};

generateCard();

let card1 = card.slice(0,5).sort();
let card2 = card.slice(5,10).sort();
let card3 = card.slice(10,15).sort();

function showCard () {
	alert("Your bingo card is\nLine 1: " + card1 + "\nLine 2: " + card2 + "\nLine 3: " + card3)
};

showCard();

function generateRandomNumber () {
	let i = 1;
	while (i <= 1) {
	let num = Math.floor((Math.random()*100)+1);
		if (!number.includes(num)){
		number.push(num); 
		i++;
		}
	}
};

function showRandomNumber () {
	alert("The number is: " + number[number.length-1]);
};

function checkCard () {

	for(let j = 0; j < card.length; j++) {
		for(let k = 0; k <number.length; k++)
		if (card[j] === number[k]) {
		card[j] = 'X';
		}
	}
	for(let o = 0; o < card1.length; o++) {
		for(let p = 0; p <number.length; p++)
		if (card1[o] === number[p]) {
		card1[o] = 'X';
		}
	}
	for(let w = 0; w < card2.length; w++) {
		for(let v = 0; v <number.length; v++)
		if (card2[w] === number[v]) {
		card2[w] = 'X';
		}
	}
	for(let q = 0; q < card3.length; q++) {
		for(let z = 0; z <number.length; z++)
		if (card3[q] === number[z]) {
		card3[q] = 'X';
		}
	}

};

function checkLine () {
	if (card1.every(element => element === 'X') || card2.every(element => element === 'X') || card3.every(element => element === 'X')){
			return true
		} else {
			return false
	}		
};

function checkBingo () {
	if (card.every(element => element === 'X')){
			return true
		} else {
			return false
	}
};

function alertLine () {
	if (countLine == 0) {
			alert('Linea!')
		} else {
			return
	}
};

function askPlayAgain () {
	let r = confirm("Would you like to play again?");
    if (r == true) {
        card = [];
        number = [];
        checkBingo() == false;
        checkLine() == false;	
        generateCard();
        card1 = card.slice(0,5).sort();
		card2 = card.slice(5,10).sort();
		card3 = card.slice(10,15).sort();
		countLine = 0;
        showCard();
        askTurn();
    	} else {
        	alert("You left the game!");
        	throw new Error ('Bye')
    }
};

function askTurn() {
    let r = confirm("Would you like to continue?");
    if (r == true) {
    	generateRandomNumber();
        showRandomNumber();
        checkCard();
        showCard();
    	} else {
        	alert("You left the game!");
        	throw new Error ('Bye')
    }
};

for (let i = 0; i < 1000000; i++) {
while (checkLine() == false){
	askTurn();
}
	if (checkBingo() ){
		alert('Bingo!');
		alert('You got Bingo in ' + number.length + ' turns.')
		askPlayAgain();
	} else if (checkLine()){
		alertLine();
		countLine++
		checkBingo();
		askTurn();
	}
};

};

bingo();
