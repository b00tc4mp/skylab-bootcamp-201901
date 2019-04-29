
// DATA questions


var questions = [
    { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
    { letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé"},
    { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
    { letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
    { letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},
    { letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
    { letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento"},
    { letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano"},
    { letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
    { letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"},
    { letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo"},
    { letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},
    { letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia"},
    { letter: "ñ", answer: "señal", status: 0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
    { letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
    { letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},
    { letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"},
    { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor"},
    { letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático"},
    { letter: "t", answer: "terminator", status: 0, question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},
    { letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},
    { letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},
    { letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"}

]


// INFO PLAYER
var player = {
	name: '',
	correctsAns: 0,
	incorectsAns:0,
	time:'',
	questionNumber:0,
	fase:0,
	win: false
}

// Events listener

document.getElementById('mainButton').addEventListener('click', function () {

	if (player.fase === 0) {

		playGame();
		
	} else if (player.fase === 1) {

		play();

	} else if (player.fase === 3) {

		repeate();

	}

});





// Add name


function addName () {
	player.name = document.getElementById('nameValue').value;
}






// Welcome part .........................................

function playGame () {

	let message = document.getElementById('nameMessage');
	let buttonM = document.getElementById('mainButton');

	if ( document.getElementById('nameValue').value === '') {

		message.style.visibility = 'visible';

	} else if ( document.getElementById('nameValue').value != '') {

		addName();
		player.fase = 1;
		buttonM.value = 'Responder';

		// buttonM.onclick = 'play()';

		document.getElementById('logo').style.display = 'none';
		document.getElementById('answers').style.display = 'block';

		document.getElementById('nameValue').value = '';
		document.getElementById('nameValue').placeholder = 'Respuesta';

		document.getElementById('infoTime').style.visibility = 'visible';
		document.getElementById('infoPoint').style.visibility = 'visible';

		document.getElementById('nameMessage').style.display = 'none';

		firstRound();

	}
}

// Finalizar y repetir el juego

function repeate () {




	document.getElementById('game_over').style.visibility = 'hidden';
	document.getElementById('infoTime').style.visibility = 'hidden';
	document.getElementById('infoPoint').style.visibility = 'hidden';

	document.getElementById('logo').style.display = 'block';

	document.getElementById('mainButton').value = 'Jugar';

	document.getElementById('nameValue').placeholder = '  Nombre';

	player.name = '';
	player.correctsAns = 0;
	player.incorectsAns = 0;
	player.time = '';
	player.questionNumber = 0;
	player.fase = 0;
	player.win = false;

	HiddenLetterByLetter();

	clearStatusQuestions();

}


	function clearStatusQuestions () {
		for (var i = 0; i < questions.length; i++) {
			questions[i].status = 0;
		}
	}


// TIMER.................................................

var corometro 

function timer () {

	var seconds = 0;
	var minuts = 0;
	var secondsDOM = document.getElementById('seconds');
	var minutsDOM = document.getElementById('minuts');

	 corometro = setInterval( function(){

		seconds++;
		secondsDOM.innerHTML = seconds;

		while(seconds>=60){
			minuts ++;
			seconds -=60;
			minutsDOM.innerHTML = minuts;
		}

	},1000);

}

// TRUE ANSWERS

function getCorrectAsnwer() {
	document.getElementById('correctsAnswers').innerHTML = player.correctsAns;
}

function showLetterByLetter () {
	let elemento = document.getElementsByClassName("letter");
	// elemento[player.questionNumber].classList.add("correct");
	let acc = 0;

	var timerShowLetters = setInterval( function() {

		if (acc === 24) {
			clearInterval(timerShowLetters);
		} else if (acc <= 24) {
		elemento[acc].style.opacity = '1';
		acc ++;
		}

	},100);
 
}

function HiddenLetterByLetter () {
	let elemento = document.getElementsByClassName("letter");
	// elemento[player.questionNumber].classList.add("correct");
	let acc = 0;

	var timerShowLetters = setInterval( function() {

		if (acc === 24) {
			clearInterval(timerShowLetters);
		} else if (acc <= 24) {
		elemento[acc].style.opacity = '0';
		elemento[acc].classList.remove("incorrect");
		elemento[acc].classList.remove("correct");
		acc ++;
		}

	},100);
 
}




// SECTION OF CORRECT ANSWERS

function addCorretsAnswers () {
	player.correctsAns += 1;
	console.log('+1 CORRECT ANSWER');
}

function addIncorretsAnswers () {
	player.incorectsAns += 1;
	console.log('+1 INCORRECT ANSWER');
}

function showCorrectsAnswers () {
	document.getElementById('correctsAnswers').innerHTML = player.correctsAns;
	console.log('SHOW CORRECT ANSWER');	

}

// DETERMINATE THE NUMBER CURRENT QUESTIONS

function getQuestionNum() {

	for (var i = 0; i < questions.length; i++) {

		
		if (player.questionNumber === 23) {

			i = 0
			player.questionNumber = 0;


		} else if (questions[i].status === 0 && i >= player.questionNumber ) {

			player.questionNumber = i;
			return i;

		}
	}

}

// SHOW question in DOM

function showQuestion () {
	document.getElementById('question').innerHTML = questions[player.questionNumber].question;	
}

// COMPROBATION OF THE RESULT
function resultComprobation () {

	let result = (document.getElementById('nameValue').value).toLowerCase();

	if (result === questions[player.questionNumber].answer) {

		questions[player.questionNumber].status = 1;

		addCorretsAnswers();
		class_addCorrect();
		getCorrectAsnwer();

		console.log(result + ' Resultado correcto!'); 

	} else if ( result === 'pasapalabra') {
		console.log(result + ' pasapalabra!')
		player.questionNumber ++;

	} else {

		questions[player.questionNumber].status = -1;

		addIncorretsAnswers();
		class_addIncorrect();
		console.log(result + ' Resultado falso!')

	}

	document.getElementById('nameValue').value = ''; 
}

// COMPROBATION OF STATUS

function winComprobation () {
	
	if (player.correctsAns + player.incorectsAns === questions.length ){
		victoryGame();
	}




}

function victoryGame() {


	clearInterval(corometro);
	player.time = document.getElementById('minuts').innerHTML + ':' + document.getElementById('seconds').innerHTML;

	document.getElementById('answers').style.display = "none";
	document.getElementById('game_over').style.visibility = "visible";

	document.getElementById('infoPlayer').innerHTML = player.name;
	document.getElementById('infoCorrectsAnswers').innerHTML = player.correctsAns;

	player.fase = 3;

	document.getElementById('InfoTime').innerHTML = player.time;

	document.getElementById('mainButton').value = 'Repetir';

}

// ADD or REMOVE selected letter class

function class_toggleSelected() {
	let elemento = document.getElementsByClassName("letter");
	elemento[player.questionNumber].classList.toggle("selected");
	console.log('Estilo de letter ha sido cambiado!')
}

function class_addCorrect () {
	let elemento = document.getElementsByClassName("letter");
	elemento[player.questionNumber].classList.add("correct");
	console.log('STYLE - CORRECT!')
}

function class_addIncorrect () {
	let elemento = document.getElementsByClassName("letter");
	elemento[player.questionNumber].classList.add("incorrect");
	console.log('STYLE - INCORRECT!')
}

function firstRound () {

	showLetterByLetter();

	showQuestion();

	class_toggleSelected();

	timer(); 

}


function play () {

	winComprobation();

	// 2. Quitar clase SELECTED de LETTER actual

	class_toggleSelected();

	// 2.1 Comprobar si el resultado es correcto. 
	// 2.2 Si es correcto status = 1 ; Si no es correcto status = -1 ; Si pone pasapalabra , se pasa a la siguiente pregunta.

	resultComprobation ();
	
	// 3. Comprobar si todas las preguntas estan completas.

	// winComprobation();

	showCorrectsAnswers();

	// 4. Determinar un numero nuevo de pregunta...................

	getQuestionNum();

	// 5. Asignar clase SELECTED al siguiente LETTER
	class_toggleSelected();

	// 6. Mostrar la nueva pregunta

	showQuestion();

}







