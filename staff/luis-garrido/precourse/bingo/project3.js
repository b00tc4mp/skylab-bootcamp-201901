// BINGO GAME! 2.0 PRO!

const nombre = prompt('¿Como te llamas?','John Snow');
let jugarBingo = true;

function bingo() {

	let bombo = 89; // bolas en el bombo
	let carton = 15; // numeros por cartón
	let numerosJugados = []; 
	let fila1 = [];
	let fila2 = [];
	let fila3 = [];
	let numbersTurno = [];
	let cuentaTurnos = 0;
	let linea = false;
	let jugarCarton = true;

	let elegirCarton = false;
	let ranking = [];
	let puntos = bombo*1000;
	
	function Usuario(nombreUsuario, puntuacion) {
		this.nombreUsuario = nombreUsuario;
   		this.puntuacion = puntuacion;
		ranking.push(this);
	}

	let cactus = new Usuario ('Cactus',15000);
	let ficus = new Usuario ('Ficus',35000);
	let enjuto = new Usuario ('Enjuto',5000);
	let hulk = new Usuario ('Hulk Hogan',25000);
	let chuck = new Usuario ('Chuck Norris',70000);

	function mostrarRanking() {
		console.log('Ranking:');
		ranking.sort(function (a, b) {return (b.puntuacion - a.puntuacion)});
		let position = 1;
		ranking.forEach(function(user) {
			console.log(`${position} - ${user.nombreUsuario} - ${user.puntuacion} puntos.`);
			position++;
		});
	}

	console.log('Así van los puntos:');
	console.log('Cada turno sin cantar Bingo te restará 1000 puntos.');
	console.log('Si cantas línea, 3000 puntos extra.');
	console.log('Si cantas bingo, 5000 puntos extra.');
	mostrarRanking();

	function crearCarton() {
		// 15 numeros random a elegir entre 90
		while (elegirCarton === false) {
			console.log(`Nuevo cartón:`);
			let numbers = [];
			fila1 = [];
			fila2 = [];
			fila3 = [];
			let nuevoCarton = '';
			while (numbers.length!==carton) {
				let randomNumber = Math.floor(Math.random()*bombo)+1;
				if (!numbers.includes(randomNumber)) {
					numbers.push(randomNumber);
				}
			}
			numbers = numbers.sort(function(a, b){return a-b}); // ordenados		

			// por si en el carton ponemos un número no múltiplo de 3...
			for (let i=0; i<numbers.length%3; i++) {
				numbers.push('X');
			}
		
			// repartidos en 3 filas
			for (let i = 0; i<numbers.length; i++) {
				fila1.push(numbers[i]);
				i++;
				fila2.push(numbers[i]);
				i++;
				fila3.push(numbers[i]);
			}
		
			// Elegir cartón
			mostrarCarton();
			while (nuevoCarton!='Y' && nuevoCarton!='N') {
			nuevoCarton = prompt('¿Quieres jugar con este cartón? Y / N', 'Y').toUpperCase();
			}
			if (nuevoCarton==='Y') {
				elegirCarton = true;
				console.log(`A jugar! Buena suerte, ${nombre}.`);
			}
		}
	}	

	function mostrarCarton() {
		var output = "||  ";
		for (let i = 0; i < fila1.length; i++) {
		output += fila1[i] + "  -  ";
		}
		console.log(output.slice(0, -3)+"||");
		var output = "||  ";
		for (let i = 0; i < fila2.length; i++) {
		output += fila2[i] + "  -  ";
		}
		console.log(output.slice(0, -3)+"||");
		var output = "||  ";
		for (let i = 0; i < fila3.length; i++) {
		output += fila3[i] + "  -  ";
		}
		console.log(output.slice(0, -3)+"||");
	}

	function compruebaLinea () {
		if (fila1.every(num => num==='X')) {
			console.log('LINEA!! +3000 puntos!');
			puntos+=3000;
			linea = true;
		}
		else if (fila2.every(num => num==='X')) {
			console.log('LINEA!! +3000 puntos!');
			puntos+=3000;
			linea = true;
		}
		else if (fila3.every(num => num==='X')) {
			console.log('LINEA!! +3000 puntos!');
			puntos+=3000;
			linea = true;
		}
	}
	
	function compruebaCarton() {
		if (fila1.every(num => num==='X') && fila2.every(num => num==='X') && fila3.every(num => num==='X')) {
			jugarCarton = false;
			mostrarCarton();
			puntos+=5000;
			console.log(`BINGO!!! +5000 puntos! Gracias por jugar, ${nombre}. Has ganado ${puntos} en ${cuentaTurnos} turnos.`);
			let player = new Usuario (nombre,puntos);
			mostrarRanking();
		}
	}

	function nuevoTurno() {
		cuentaTurnos++; // contador de turnos
		puntos-=1000; // restador de puntos
		let randomNumber = Math.floor(Math.random()*bombo)+1;
		while (numerosJugados.includes(randomNumber)) {
			randomNumber = Math.floor(Math.random()*bombo)+1;
		}
		numerosJugados.push(randomNumber);
		console.log(`Turno ${cuentaTurnos}; bola ${randomNumber}`);
		if (!numbersTurno.includes(randomNumber)) { // comprobar si el numero esta en el carton
			numbersTurno.push(randomNumber);
		}
		if (fila1.includes(randomNumber)) {
			fila1[fila1.indexOf(randomNumber)] = 'X'; // cambiar por x el numero acertado
		}
		else if (fila2.includes(randomNumber)) {
			fila2[fila2.indexOf(randomNumber)] = 'X';
		}
		else if (fila3.includes(randomNumber)) {
			fila3[fila3.indexOf(randomNumber)] = 'X';
		}
		else {
			console.log('No hay coincidencias');
		}
		if (linea === false) { //si no hay linea cantada, comprueba si en este turno se consigue
			compruebaLinea();
		}
		compruebaCarton();
	}

	crearCarton();
	
	while(jugarCarton===true) {
		mostrarCarton();
		let seguirJugando = '';
		while (seguirJugando!='Y' && seguirJugando!='N') {
			seguirJugando = prompt('¿Seguir jugando? Y / N', 'Y').toUpperCase();
		}
		if (seguirJugando==='N') {
			jugarCarton = false;
			console.log(`Gracias por jugar, ${nombre}. Has aguantado ${cuentaTurnos} turnos.`);
		}
		else {
			nuevoTurno();
		}
	}
}

while(jugarBingo===true) {
	bingo();
	let seguirJugandoBingo = '';
	while (seguirJugandoBingo!='Y' && seguirJugandoBingo!='N') {
		seguirJugandoBingo = prompt('¿Otra partida? Y / N').toUpperCase();
	}
	if (seguirJugandoBingo==='N') {
		jugarBingo = false;
		console.log(`Hasta la próxima, ${nombre}!`);
	}
}


// -----------------------------------------------------------------------------------------------------

// BINGO GAME! 1.0

const nombre = prompt('¿Como te llamas?','John Snow');
let jugarBingo = true;

function bingo() {

	let bombo = 30; // bolas en el bombo
	let carton = 15; // numeros por cartón
	let numerosJugados = []; 
	let fila1 = [];
	let fila2 = [];
	let fila3 = [];
	let numbersTurno = [];
	let cuentaTurnos = 0;
	let linea = false;
	let jugarCarton = true;

	function crearCarton() {
		// 15 numeros random a elegir entre 90
		let numbers = [];
		while (numbers.length!==carton) {
			let randomNumber = Math.floor(Math.random()*bombo)+1;
			if (!numbers.includes(randomNumber)) {
				numbers.push(randomNumber);
			}
		}
		numbers = numbers.sort(function(a, b){return a-b}); // ordenados
		
		// repartidos en 3 filas
		
		for (let i = 0; i<numbers.length; i++) {
			fila1.push(numbers[i]);
			i++;
			fila2.push(numbers[i]);
			i++;
			fila3.push(numbers[i]);
		}
	}	
	function mostrarCarton() {
		var output = "||  ";
		for (let i = 0; i < fila1.length; i++) {
		output += fila1[i] + "  -  ";
		}
		console.log(output.slice(0, -3)+"||");
		var output = "||  ";
		for (let i = 0; i < fila2.length; i++) {
		output += fila2[i] + "  -  ";
		}
		console.log(output.slice(0, -3)+"||");
		var output = "||  ";
		for (let i = 0; i < fila3.length; i++) {
		output += fila3[i] + "  -  ";
		}
		console.log(output.slice(0, -3)+"||");
	}

	function compruebaLinea () {
		if (fila1.every(num => num==='X')) {
			console.log('LINEA!!');
			linea = true;
		}
		else if (fila2.every(num => num==='X')) {
			console.log('LINEA!!');
			linea = true;
		}
		else if (fila3.every(num => num==='X')) {
			console.log('LINEA!!');
			linea = true;
		}
	}
	
	function compruebaCarton() {
		if (fila1.every(num => num==='X') && fila2.every(num => num==='X') && fila3.every(num => num==='X')) {
			jugarCarton = false;
			mostrarCarton();
			console.log(`BINGO!!! Gracias por jugar, ${nombre}. Has ganado en ${cuentaTurnos} turnos.`);
		}
	}

	function nuevoTurno() {
		cuentaTurnos++; // contador de turnos
		let randomNumber = Math.floor(Math.random()*bombo)+1;
		while (numerosJugados.includes(randomNumber)) {
			randomNumber = Math.floor(Math.random()*bombo)+1;
		}
		numerosJugados.push(randomNumber);
		console.log(`Turno ${cuentaTurnos}; bola ${randomNumber}`);
		if (!numbersTurno.includes(randomNumber)) { // comprobar si el numero esta en el carton
			numbersTurno.push(randomNumber);
		}
		if (fila1.includes(randomNumber)) {
			fila1[fila1.indexOf(randomNumber)] = 'X'; // cambiar por x el numero acertado
		}
		else if (fila2.includes(randomNumber)) {
			fila2[fila2.indexOf(randomNumber)] = 'X';
		}
		else if (fila3.includes(randomNumber)) {
			fila3[fila3.indexOf(randomNumber)] = 'X';
		}
		else {
			console.log('No hay coincidencias');
		}
		if (linea === false) { //si no hay linea cantada, comprueba si en este turno se consigue
			compruebaLinea();
		}
		compruebaCarton();
	}

	crearCarton();
	
	while(jugarCarton===true) {
		mostrarCarton();
		let seguirJugando = '';
		while (seguirJugando!='Y' && seguirJugando!='N') {
			seguirJugando = prompt('¿Seguir jugando? Y / N').toUpperCase();
		}
		if (seguirJugando==='N') {
			jugarCarton = false;
			console.log(`Gracias por jugar, ${nombre}. Has aguantado ${cuentaTurnos} turnos.`);
		}
		else {
			nuevoTurno();
		}
	}
}

while(jugarBingo===true) {
	bingo();
	let seguirJugandoBingo = '';
	while (seguirJugandoBingo!='Y' && seguirJugandoBingo!='N') {
		seguirJugandoBingo = prompt('¿Otra partida? Y / N').toUpperCase();
	}
	if (seguirJugandoBingo==='N') {
		jugarBingo = false;
		console.log(`Hasta la próxima, ${nombre}!`);
	}
}
