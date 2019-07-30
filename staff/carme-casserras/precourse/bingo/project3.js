function makeCard() {
	let bingoCard = [
	{num: randomNum(), matched: false},
	{num: randomNum(), matched: false},
	{num: randomNum(), matched: false},
	{num: randomNum(), matched: false},
	{num: randomNum(), matched: false},
	//netx line
	{num: randomNum(), matched: false},
	{num: randomNum(), matched: false},
	{num: randomNum(), matched: false},
	{num: randomNum(), matched: false},
	{num: randomNum(), matched: false},
	//netx line
	{num: randomNum(), matched: false},
	{num: randomNum(), matched: false},
	{num: randomNum(), matched: false},
	{num: randomNum(), matched: false},
	{num: randomNum(), matched: false}
	]
	return bingoCard;
};
// funció per imprimir cartró
function printCard(card){
	let line ='';
	for (let i = 0; i < 15; i+=5){
		for (let j = 0; j < 5; j++) {
			line += card[j+i].num + ' ';
		};
		console.log(line);
		line = '';
	};
};
//funció per numero aletori
function randomNum() {
	return Math.floor(Math.random()* 90)+1;
};

function newTurn() {
	return confirm('Quieres continuar jugando?');
};

function checkCard(card, numRandom) {
	card.forEach(element => {
		if ( element.num === numRandom) {
			element.num = 'X';
		};
	});
	return card;
};
function linea(card) {
	if ((card.slice(0, 4).every(elemento => elemento.num === 'X')) && (card.slice(0, 4).every(elemento => elemento.matched === false))) {		
		card.slice(0, 14).every(elemento => elemento.matched = true);
		return 'LINEA';
	};	
	if ((card.slice(5, 9).every(elemento => elemento.num === 'X')) && (card.slice(0, 4).every(elemento => elemento.matched === false))) {		
		card.slice(0, 14).every(elemento => elemento.matched = true);
		return 'LINEA';
	};	
	if ((card.slice(10, 14).every(elemento => elemento.num === 'X')) && (card.slice(10, 14).every(elemento => elemento.matched === false))) {				card.slice(0, 14).every(elemento => elemento.matched = true);		
		return 'LINEA';
	};
	if (card.every(elemento => elemento.num === 'X')) {
		return 'BINGO';
	};
};
//funció principal
function bingo(){
	let name = prompt('What\'s your name?');
	let cartro = makeCard();
	let number = 0;	
	let win = '';
	let contador = 0;
	printCard(cartro);
	// no poso === true, pq de per si la condició ha de ser true per funcionar
	while (newTurn()) {
		// tiro el bombo
		number = randomNum();
		contador ++;
		console.log(number);
		//miro si coincideix amb algun numero del cartro i el canvio per X		
		cartro = checkCard(cartro, number);
		printCard(cartro);
		win = linea(cartro);
		if ((win === 'LINEA') || (win === 'BINGO')) {
			console.log(win);
			if (win === 'BINGO') {
				if (confirm('Has jugado '+ contador +' numeros.\nQuieres volver a jugar?') === true) {
					cartro = makeCard();
					contador = 0;
					printCard(cartro);
				} else { 
					console.log('ADEU');
					return false;
				};
			};
			win = '';
		}
	};
console.log('CIAO');
};
bingo();