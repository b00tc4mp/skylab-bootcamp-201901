//Skylab Airlines
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

function userStart() {
   var user = prompt("¿Cómo te llamas?");
   if (user != null) {
      console.log('¡Bienvenido ' + user + '! Estos son los vuelos disponibles: ');
      return flightsFunc();
   }
}
userStart();


function flightsFunc() {
   var flyCost = 0;
   var scaleFly = [];
   var finalFly = [];
   for (var prop in flights) {
      if (flights[prop].scale == true) {
         console.log('El vuelo con origen: ' + flights[prop].from + ', y destino: ' + flights[prop].to + ' tiene un coste de ' + flights[prop].cost + '€ y realiza escala.');
      } else {
         console.log('El vuelo con origen: ' + flights[prop].from + ', y destino: ' + flights[prop].to + ' tiene un coste de ' + flights[prop].cost + '€ y no realiza ninguna escala.');

      }
      flyCost += flights[prop++].cost;
   
   }
   console.log('El coste medio de un vuelo es: ' + Math.round(flyCost/11) + '€');
   for (var prop in flights) {
      if (flights[prop].scale == true) {
         scaleFly.push(flights[prop].from + ' => ' + flights[prop].to);
      }
   }
   console.log('Los vuelos que efectúan escala son: ' + scaleFly);
   for (var prop in flights) {
      if (flights[prop].id > 5) {
         finalFly.push(flights[prop].to)
      }
   }
   console.log('Los últimos destinos disponibles son: ' + finalFly);   
}
