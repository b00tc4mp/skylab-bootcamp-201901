//PROYECTO TEMA2

//Variables de clase
var flights = [
    { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];

console.log(flights[0].to); //output: Bilbao

//Recibir al usuario

var name = prompt ("Welcome to Skylab Airlines, What's your name?:", );

console.log("Hi " + name +" these are the available flights:");
var costAcum = 0;
var numEscalas = 0;
flights.forEach(function(flight){
	var escala;
		if(flight.scale == true){
			escala = "con escalas";
			numEscalas ++;
		} else {
			escala = "sin escalas";
		}
		costAcum = costAcum +  flight.cost;
		console.log("El siguiente vuelo viene de " + flight.from + " y va a " + flight.to + " y precio " + flight.cost + "€ y " + escala + ".");
	});

costAcum = costAcum / flights.length;

console.log("El coste medio es " +  costAcum.toFixed(2) + " y hay " + numEscalas + " escalas.");
mostraultimsvols(5);

function mostraultimsvols(n){

	console.log("los destinos de los últimos " + n +" vuelos son:");
	for (var i = flights.length - n; i < flights.length; i++ ){
		console.log("DESTINO: " + flights[i].to);
	}
}

	

