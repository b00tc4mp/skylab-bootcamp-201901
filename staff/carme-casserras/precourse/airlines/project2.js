project2.js
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
let nameUser = prompt('Como te llamas? ');
	console.log('Bienvenid@ ' + nameUser + ' a Skylab Airlines \n');

let totFlights ='';
let totalCost = 0;
let totalScale = '';
let lastFlights ='';

for (let i in flights) {
	totalCost += flights[i].cost;
	let trueScale = '';
	if (!flights[i].scale) {
		trueScale = 'y no realiza ninguna escala';
	} 
	totFlights += 'El vuelo con origen: ' + flights[i].to + ', y destino: ' + flights[i].from + ' tiene un coste de '+flights[i].cost + '€ '+trueScale+'\n';

	if (flights[i].scale) {
	totalScale += 'El vuelo ' +flights[i].to +' - ' + flights[i].from + ' tiene escalas \n';
	};

	if (flights[i].id > 5 ) {
		lastFlights += flights[i].to + '\n';
	}
};
console.log(totFlights);
let prom =	totalCost / flights.length;
console.log('El coste medio de todos los vuelos es ' + prom.toFixed(2) +' \n');
console.log(totalScale);
console.log('ULTIMOS VUELOS DEL DIA: \n' +lastFlights);