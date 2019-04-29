// Resultado del display de la calculadora
var proces = '';
var result = '';


// Show results
function showResult () {
	document.getElementById("result").textContent = result;
}

function showProces () {
	document.getElementById("proces").textContent = proces;
}

// Add number

function buttonNum (num) {	

	if (proces === '' ) {

		if (num === '+' || num === '-' || num === '/' || num === '*') {
			console.log('Introduce un numero');
		} else {
			proces += num;
			result += num;	
		}
	} else if (num === '+' || num === '-' || num === '/' || num === '*') {
		if (proces[proces.length-1] === '*' || proces[proces.length-1] === '+' || proces[proces.length-1] === '-' || proces[proces.length-1] === '/') {
			proces = proces.slice(0,proces.length-1);
			result = result.slice(0,result.length-1);
			proces += num;
			result += num;
		} else {
			proces += num;
			result += num;
		}
	} else {

			proces += num;
			result += num;	
	}

	showProces();
	showResult();
}


function delate () {
	proces = proces.slice ( 0 , proces.length-1);
	showProces();

}

function clean () {
	proces = '';
	result = '';
	showProces();
	showResult();
}

// Make the calculating

function calculating () {
		result = eval(proces);

	if (typeof result === 'number') {result.toString();}
	showResult();
	showProces();



	proces = '';
	result = '';
	if (typeof proces === 'number') {proces.toString();}

}


