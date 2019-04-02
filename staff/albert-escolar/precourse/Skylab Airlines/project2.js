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

console.log('Bienvenido! Cual es su nombre de usuario?');

function flightsInfo() {
    var flightsCostSum = 0;
    var numberOfFlightsWithScale = 0;
    var flightsDestination = '';
    flights.forEach(function (flight) {
        flightsCostSum += flight.cost;
        if (flight.scale == false) {

            console.log('El vuelo con origen: ' + flight.from + ' y destino: ' + flight.to + ' tiene un coste de: ' + flight.cost + ' y no efectuara ninguna escala');

        }


    })
    flights.forEach(function (flight) {
        if (flight.scale == true) {
            numberOfFlightsWithScale += 1;
        }
    })
    flights.forEach(function (flight) {
        if (flight.id > 05 && flight.id<10) {
            flightsDestination += flight.to + ', ';
        }
        if(flight.id == 10){
            flightsDestination += flight.to + '.'
        }
    })

    var flightsCostAv = Math.floor(flightsCostSum / flights.length);
    console.log('La suma del precio de los vuelos es de: ' + flightsCostSum);
    console.log('El precio medio de los vuelos es de: ' + flightsCostAv);
    console.log('El número de vuelos con escala son: ' + numberOfFlightsWithScale);
    console.log('El destino de los ultimos 5 vuelos son: '+ flightsDestination);

} 
flightsInfo();
