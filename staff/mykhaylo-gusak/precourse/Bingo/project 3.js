
//............................................................................................................................... DATA

//..............RANKING

var rank = [
	{ playerName:'Oleh',playerId:1, totalTurns:25},
	{ playerName:'Marko',playerId:2, totalTurns:44},
	{ playerName:'John',playerId:3, totalTurns:32},
	{ playerName:'James',playerId:4, totalTurns:22}
	];
rank.sort();

//.....USER & GAME INFO

var user = {
	name: '',
	lastName: '',
	lives: 3,
	carton: [],
	id:'',
	gameInfo: {
		gamePower: true,
		gameWin: false,
		turnNumber: 0,
		carton: [],
		cartonNumbers: 15,
		randomNumbers: 17,
		table: [],
		lines: {
			lineA: ['',1],
			lineB: ['',1],
			lineC: ['',1]
		}
	}
}

//.....MESSAGES

var finMessage = ' GAME OVER';

//................................................................................................................................ RANK
// Add info to rank list
function insertRank () {

	let player = user.name + ' ' + user.lastName;
	rank.push({ playerName:player,playerId:user.id,totalTurns:user.gameInfo.turnNumber});
}
// Show rank to te user
function showRank (num) {

	let sorted = rank.sort( function (prev,next) {return prev.totalTurns - next.totalTurns} );

	console.log('...........RANK.........');

	Object.keys(sorted).forEach(function (x) {
	 console.log('Player ' + rank[x].playerName + ' player ID:' + rank[x].playerId + ' TURNS: ' + rank[x].totalTurns);
	});

	console.log('........................');
}

//.......................................................................................................................... START INFO
// Restart info
function restartInfo () {
	user.id = '';
	user.carton = [];
	user.gameInfo.table = [];
	user.gameInfo.turnNumber = 0;
	user.gameInfo.lines.lineA = ['',1];
	user.gameInfo.lines.lineB = ['',1];
	user.gameInfo.lines.lineC = ['',1];
	user.gameInfo.gamePower = true;
	user.gameInfo.gameWin = false;
}

//...............................................................................................................................WELCOME
function welcome () {
	user.name = prompt ('Put your name.', 'Name');
	user.lastName = prompt('Put your lastname','Lastname');
	user.id = rank.length + 1;
	showRank();
	console.log('Hello Mr/Ms ' + user.name + ' ' + user.lastName + ', welcome to bingo game.');
}
 //.....................................................................................................RANDOM GENERATION TO FILL ARRAYS

// Function that generates a random number
function getRandom () {
	
	return Math.floor(Math.random()*user.gameInfo.randomNumbers+1);
}

//Function that returns a different(unique) random number from the chosen array
function getDiferentRandom (list,times) {

	while(list.length < times){

		let temporalRandom = getRandom();

		if (list.indexOf(temporalRandom) === -1) {
		list.push(temporalRandom);
		} 
	}
}


//.....................................................................................................................CARTON GENERATION
function generateCarton (){
	let cartonMessage 

	//Generation random numbers for user card
	getDiferentRandom(user.carton,user.gameInfo.cartonNumbers);	
	//Showing card with numbers to the user
	cartonMessage = 'Its your card!';
	console.log(cartonMessage);	
	showCarton();
	//Asking to user if he need change the card
	if (confirm('Would you like to change the card?') === true ) {
		//Cleaning the card
		user.carton = [];
		//Generating new random numbers(new card)
		getDiferentRandom(user.carton,user.gameInfo.cartonNumbers);
		//Changing message to show to the user
		cartonMessage = 'Its your new card!';
		//Showing card with new numbers to the user
		console.log(cartonMessage);
		showCarton();
	} 
	alert('Lets begin the game!')
}

//Show cart to the user
function showCarton () {
	console.log('LINE A => ' + user.carton[0] + ' ' + user.carton[1] + ' ' + user.carton[2] + ' ' + user.carton[3] + ' ' + user.carton[4]);
	console.log('LINE B => ' + user.carton[5] + ' ' + user.carton[6] + ' ' + user.carton[7] + ' ' + user.carton[8] + ' ' + user.carton[9]);
	console.log('LINE C => ' + user.carton[10] + ' ' + user.carton[11] + ' ' + user.carton[12] + ' ' + user.carton[13] + ' ' + user.carton[14]);
}


//...............................................................................................................CHECK IF IT COMPLETED
function completedCarton () {
	//Cheking if its completed
	let result = user.carton.join();
	let win = 'X,X,X,X,X,X,X,X,X,X,X,X,X,X,X'

	if ( result === win) {
		victory();		
	}	
}

//........................................................................................................... CHECK IF A LINE IS CLOSED
function lineClosed (){

	user.gameInfo.lines.lineA[0] = user.carton.slice(0,5).join();
	user.gameInfo.lines.lineB[0] = user.carton.slice(5,10).join();
	user.gameInfo.lines.lineC[0] = user.carton.slice(10,15).join();

	let aLine = user.gameInfo.lines.lineA;
	let bLine = user.gameInfo.lines.lineB;
	let cLine = user.gameInfo.lines.lineC;

	let closedLine = 'X,X,X,X,X';

	if (aLine[0] === closedLine && aLine[1] === 1) {
		aLine[1] = 0;
		console.log('LINE A CLOSED' + ' ' + aLine[1]);
	} else if (bLine[0] === closedLine && bLine[1] === 1 ){
		bLine[1] = 0;
		console.log('LINE B CLOSED' + ' ' +  bLine[1]);
	} else if (cLine[0] === closedLine && cLine[1] === 1 ){
		cLine[1] = 0;
		// alert('You just closed line C.');
		console.log('LINE C CLOSED' + ' ' +  cLine[1]);
	}
}


//.......................................................................................................................TURN FUNCTION


function turn () {

	confirmTurn();
	//Add 1 everytime we start the turn
	user.gameInfo.turnNumber += 1;
	console.log('T U R N: ' + user.gameInfo.turnNumber );

	showCarton();
	// console.log('Last numbers: ' + table);
	//Generating new bingo number
	getDiferentRandom(user.gameInfo.table,user.gameInfo.turnNumber);
	comparation(user.gameInfo.turnNumber);
	//Cheking if is completed

	// while ( turnNumber >= 15){
		completedCarton();
	// }

	// while ( turnNumber >= 5){
		lineClosed();
	// }

}

//................................................................................................................USERS CONFIMATIONS
// Confirmation by user to identify the number to mark X
function confirmNumber (num){
	let checkNumber = confirm('New number => ' + num + ' . Please, check the number!')
	if (checkNumber === true) {
		return true
	} else {
		return false
	}
}
//Confirm by user to go to the next turn
function confirmTurn () {
	let checkTurn = confirm('Go to the next turn?')
	if (checkTurn === true) {
		return true
	} else {
		gameOver();
		return false;
	}
}
//...................................................................................................................... COMPARATION

function comparation (turn) {

	if (confirmNumber(user.gameInfo.table[turn-1]) === true){

		if (user.carton.indexOf(user.gameInfo.table[turn-1]) === -1 ) {
			alert('WRONG!You have not this number!Pay more attenton!')
		} else {
			user.carton[user.carton.indexOf(user.gameInfo.table[turn-1])] = 'X';
			alert('Well done! Lets keep going to the victory!')
		}

	} else if (user.carton.indexOf(user.gameInfo.table[turn-1]) != -1){
		finMessage = 'You lost your number! GAME OVER';
		gameOver();
	} 


}

//...........................................................................................................................THE END
//Gave over
function gameOver (){
	user.gameInfo.gamePower = false;
	alert(finMessage);
	replay();
}
//Congratulations
function victory () {
	user.gameInfo.gameWin = true;
	insertRank();
	showRank();
	alert('Congratulation ' + user.name + ' ' + user.lastName + ' with the victory!');
	replay();
}

function replay () {

	if (confirm('Would you like to play more?') === true) {
		restartInfo();
		bingo();

	} else {
		alert('Thank you for playing! See you.')
	}
}


//......................................................................................................................FATHER FUNCTION
function bingo () {

	//Giving welcome
	welcome();
	//Generate the card that likes to user
	generateCarton();

	while (user.gameInfo.gamePower === true && user.gameInfo.table.length < user.gameInfo.randomNumbers && user.gameInfo.gameWin === false){
		turn();	
	}
}

bingo();


