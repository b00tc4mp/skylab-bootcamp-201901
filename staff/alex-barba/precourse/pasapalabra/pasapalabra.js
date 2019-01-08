let questions = [
	{id: 00, letter: 'A', question: 'What is the largest reptile in North America?', answer: 'Alligator', status: 0},
	{id: 01, letter: 'B', question: 'What is the biggest animal in the world?', answer: 'Blue Whale', status: 0},
	{id: 02, letter: 'C', question: 'What is the capital of Venezuela?', answer: 'Caracas', status: 0},
	{id: 03, letter: 'D', question: 'What is the name of the headmaster of Hogwarts in the Harry Potter books?', answer: 'Dumbledore', status: 0 },
	{id: 04, letter: 'E', question: 'North, South, _______, West, what is missing?', answer: 'East', status: 0 },
	{id: 05, letter: 'F', question: 'Who was the lead singer of the band Queen?', answer: 'Freddie Mercury', status: 0 },
	{id: 06, letter: 'G', question: 'What metal does the symbol Au represent on the periodic table?', answer: 'Gold', status: 0 },
	{id: 07, letter: 'H', question: 'Which character in Greek mythology did 12 impossible tasks?', answer: 'Hercules', status: 0 },
	{id: 08, letter: 'I', question: 'Tony Stark is the alta-ego of which superhero?', answer: 'Ironman', status: 0 },
	{id: 09, letter: 'J', question: 'Which Italian football club based in Turin wears black and white stripes?', answer: 'Juventus', status: 0 },
	{id: 10, letter: 'K', question: 'What is the tallest mountain in Africa?', answer: 'Kilimanjaro', status: 0 },
	{id: 11, letter: 'L', question: 'Which singers real name is Stefani Joanne Angelina Germanotta?', answer: 'Lady Gaga', status: 0 },
	{id: 12, letter: 'M', question: 'Oktober fest is a beer festival which happens in which European city?', answer: 'Munich', status: 0 },
	{id: 13, letter: 'N', question: 'Which tennis player won 9 French open titles between 2005 and 2014?', answer: 'Rafael Nadal', status: 0 },
	{id: 14, letter: 'O', question: 'What sea creature with 8 legs is eaten in parts of Spain and Portugal?', answer: 'Octopus', status: 0 },
	{id: 15, letter: 'P', question: 'Who is the president of Russia?', answer: 'Putin', status: 0 },
	{id: 16, letter: 'Q', question: 'What is the capital of Ecuador?', answer: 'Quito', status: 0 },
	{id: 17, letter: 'R', question: 'Which famous singer from the Caribbean has the surname Fenty?', answer: 'Rihanna', status: 0 },
	{id: 18, letter: 'S', question: 'Which actress plays Bella Swan in the Twilight series?', answer: 'Kristen Stewart', status: 0 },
	{id: 19, letter: 'T', question: 'What historical region of Romania is considered the home of Dracula?', answer: 'Transylvania', status: 0 },
	{id: 20, letter: 'U', question: '1930, what country hosted and won the first football world cup?', answer: 'Uruguay', status: 0 },
	{id: 21, letter: 'V', question: 'What’s the smallest country in the world?', answer: 'Vatican', status: 0 },
	{id: 22, letter: 'W', question: 'What is the name of the cowboy in the Toy Story films?', answer: 'Woody', status: 0 },
	{id: 23, letter: 'X', question: 'Cyclops, Iceman and Wolverine are member of which superhero group?', answer: 'X-men', status: 0 },
	{id: 24, letter: 'Y', question: 'What is the name of New Yorks most famous baseball team?', answer: 'Yankees', status: 0 },
	{id: 25, letter: 'Z', question: 'What is the name of the scientific study of animals?', answer: 'Zoology', status: 0 },
	];

let result = 0;
	document.getElementById("result").innerHTML= result; 

let seconds = 150;
	document.getElementById('timing').innerHTML= seconds;

let pos= 0;
let alphabeticals = [];



function startGame() {
	document.getElementById("theend").style.display="none";
	document.getElementById("presentation").style.display="none"; 
	document.getElementById("letter").style.display="block";
	document.getElementById("answer").style.display="inline-block";
	document.getElementById("send").style.display="inline-block";
	document.getElementById("alphabetical").style.display="inline-block";
	document.getElementById("questions").style.display="inline-block";
	document.getElementById('letter').innerHTML= 'With the letter "' + questions[pos].letter + '": ' + questions[pos].question;
	document.getElementById(pos).style.background= "#9BB0DD";
	countdown();
};

function checkIfAllIsAnswered () {
	if (Object.values(questions).every(element => element.status !== 0)){
		return true
	} else {
	return false
	}
};

function verify(){

	if (Object.values(questions).every(element => element.status !== 0) && Object.values(questions).every(element => element.status !== 3)) {
				showResults()
	} else if (Object.values(questions).every(element => element.status !== 0)){
		if (document.getElementById('answer').value.toUpperCase() === questions[alphabeticals[0]].answer.toUpperCase()) {
			document.getElementById([alphabeticals[0]]).style.background= "#B6C05D";
			result ++
			document.getElementById("result").innerHTML= result;
			questions[[alphabeticals[0]]].status = 1
			document.getElementById('answer').value = ''
			alphabeticals.shift()
		}else {
			questions[alphabeticals[0]].status = 2
			document.getElementById([alphabeticals[0]]).style.background= "#B31B1B";
			alphabeticals.shift()
			document.getElementById('answer').value = ''
		}
	} else { 
		if (document.getElementById('answer').value.toUpperCase() === questions[pos].answer.toUpperCase()){
			document.getElementById(pos).style.background= "#B6C05D";
			result ++
			document.getElementById("result").innerHTML= result; 
			questions[pos].status = 1
			pos ++
			document.getElementById('answer').value = ''
			console.log('yes')
		}else {
			questions[pos].status = 2
			document.getElementById(pos).style.background= "#B31B1B";
			pos++
			document.getElementById('answer').value = ''
			console.log('no')
		}
	}
	checkIfAllIsAnswered() ? checkAlphabeticals() : newQuestion()		
};

function alphabetical() {
	if (!checkIfAllIsAnswered()) {
		questions[pos].status = 3;
		alphabeticals.push(questions[pos].id)
		console.log(alphabeticals)
		document.getElementById(pos).style.background= ""
		pos ++
		newQuestion()
	} else {
		document.getElementById(alphabeticals[0]).style.background= ""
		console.log(alphabeticals[0])
		alphabeticals.push(alphabeticals[0])
		alphabeticals.shift()
		checkAlphabeticals()
	}
}

function newQuestion() {
	if (questions[pos].status === 0) {
		document.getElementById(pos).style.background= "#9BB0DD";
		document.getElementById('letter').innerHTML = 'With the letter "' + questions[pos].letter + '": ' + questions[pos].question;
	}
}

function checkAlphabeticals () {
	if (Object.values(questions).every(element => element.status !== 3)){
		showResults()
	} else{
		document.getElementById(alphabeticals[0]).style.background= "#9BB0DD";
		document.getElementById('letter').innerHTML = 'With the letter "' + questions[alphabeticals[0]].letter + '": ' + questions[alphabeticals[0]].question;
	}
}

function showResults () {
	document.getElementById("letter").style.display="none";
	document.getElementById("answer").style.display="none";
	document.getElementById("send").style.display="none";
	document.getElementById("alphabetical").style.display="none";
	document.getElementById("questions").style.display="none";
	document.getElementById("theend").style.display="inline-block";
	document.getElementById('texttheend').innerHTML= 'THE END! You have correctly answered ' + result + ' questions!';
}

let input = document.getElementById("answer");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("send").click();
    }
});



function countdown() {
	if (seconds == 1) {
		seconds = 0;
		document.getElementById('timing').innerHTML= seconds;
		showResults();
	} else {
	seconds--;
	document.getElementById('timing').innerHTML= seconds;
	timeoutMyOswego = setTimeout(countdown, 1000);
	}
};


function playAgain() {
	result = 0;
	pos= 0;
	alphabeticals = [];
	questions = [
	{id: 00, letter: 'A', question: 'What is the largest reptile in North America?', answer: 'Alligator', status: 0},
	{id: 01, letter: 'B', question: 'What is the biggest animal in the world?', answer: 'Blue Whale', status: 0},
	{id: 02, letter: 'C', question: 'What is the capital of Venezuela?', answer: 'Caracas', status: 0},
	{id: 03, letter: 'D', question: 'What is the name of the headmaster of Hogwarts in the Harry Potter books?', answer: 'Dumbledore', status: 0 },
	{id: 04, letter: 'E', question: 'North, South, _______, West, what is missing?', answer: 'East', status: 0 },
	{id: 05, letter: 'F', question: 'Who was the lead singer of the band Queen?', answer: 'Freddie Mercury', status: 0 },
	{id: 06, letter: 'G', question: 'What metal does the symbol Au represent on the periodic table?', answer: 'Gold', status: 0 },
	{id: 07, letter: 'H', question: 'Which character in Greek mythology did 12 impossible tasks?', answer: 'Hercules', status: 0 },
	{id: 08, letter: 'I', question: 'Tony Stark is the alta-ego of which superhero?', answer: 'Ironman', status: 0 },
	{id: 09, letter: 'J', question: 'Which Italian football club based in Turin wears black and white stripes?', answer: 'Juventus', status: 0 },
	{id: 10, letter: 'K', question: 'What is the tallest mountain in Africa?', answer: 'Kilimanjaro', status: 0 },
	{id: 11, letter: 'L', question: 'Which singers real name is Stefani Joanne Angelina Germanotta?', answer: 'Lady Gaga', status: 0 },
	{id: 12, letter: 'M', question: 'Oktober fest is a beer festival which happens in which European city?', answer: 'Munich', status: 0 },
	{id: 13, letter: 'N', question: 'Which tennis player won 9 French open titles between 2005 and 2014?', answer: 'Rafael Nadal', status: 0 },
	{id: 14, letter: 'O', question: 'What sea creature with 8 legs is eaten in parts of Spain and Portugal?', answer: 'Octopus', status: 0 },
	{id: 15, letter: 'P', question: 'Who is the president of Russia?', answer: 'Putin', status: 0 },
	{id: 16, letter: 'Q', question: 'What is the capital of Ecuador?', answer: 'Quito', status: 0 },
	{id: 17, letter: 'R', question: 'Which famous singer from the Caribbean has the surname Fenty?', answer: 'Rihanna', status: 0 },
	{id: 18, letter: 'S', question: 'Which actress plays Bella Swan in the Twilight series?', answer: 'Kristen Stewart', status: 0 },
	{id: 19, letter: 'T', question: 'What historical region of Romania is considered the home of Dracula?', answer: 'Transylvania', status: 0 },
	{id: 20, letter: 'U', question: '1930, what country hosted and won the first football world cup?', answer: 'Uruguay', status: 0 },
	{id: 21, letter: 'V', question: 'What’s the smallest country in the world?', answer: 'Vatican', status: 0 },
	{id: 22, letter: 'W', question: 'What is the name of the cowboy in the Toy Story films?', answer: 'Woody', status: 0 },
	{id: 23, letter: 'X', question: 'Cyclops, Iceman and Wolverine are member of which superhero group?', answer: 'X-men', status: 0 },
	{id: 24, letter: 'Y', question: 'What is the name of New Yorks most famous baseball team?', answer: 'Yankees', status: 0 },
	{id: 25, letter: 'Z', question: 'What is the name of the scientific study of animals?', answer: 'Zoology', status: 0 },
	]
	document.getElementById(0).style.background= "";
	document.getElementById(1).style.background= "";
	document.getElementById(2).style.background= "";
	document.getElementById(3).style.background= "";
	document.getElementById(4).style.background= "";
	document.getElementById(5).style.background= "";
	document.getElementById(6).style.background= "";
	document.getElementById(7).style.background= "";
	document.getElementById(8).style.background= "";
	document.getElementById(9).style.background= "";
	document.getElementById(10).style.background= "";
	document.getElementById(11).style.background= "";
	document.getElementById(12).style.background= "";
	document.getElementById(13).style.background= "";
	document.getElementById(14).style.background= "";
	document.getElementById(15).style.background= "";
	document.getElementById(16).style.background= "";
	document.getElementById(17).style.background= "";
	document.getElementById(18).style.background= "";
	document.getElementById(19).style.background= "";
	document.getElementById(20).style.background= "";
	document.getElementById(21).style.background= "";
	document.getElementById(22).style.background= "";
	document.getElementById(23).style.background= "";
	document.getElementById(24).style.background= "";
	document.getElementById(25).style.background= "";

	seconds= 150;

	startGame()
}




