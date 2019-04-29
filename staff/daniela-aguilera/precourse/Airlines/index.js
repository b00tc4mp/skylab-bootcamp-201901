
Programa una inferfaz de usuario para una aerolinea (por terminal...). Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, para empezar, estos vuelos estarán declarados de manera global, cuando se llame a la función:
Se preguntará por el nombre de usuario y dará la bienvenida.
El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
A continuación, el usuario verá el coste medio de los vuelos.
También podrá ver cuantos vuelos efectúan escalas.


Sabiendo que los ultimos 5 vuelos (los últimos 5 IDs) son los últimos del día, muestra al usuario sus destinos.

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

var user = prompt ('Hola ' + ' ¿Cuál es tu nombre?');
console.log('Bienvenido a Skylab Airlines ' + user)

let skylabAirlinesFlights = function availableFlights (flights) {
    let flightsWithScale = 0;
    let totalCostFlights = 0;

    flights.forEach(function(flight, index) {

        let scale;
        if (flight.scale){
            scale = ' y tiene escalas '
            flightsWithScale++
        } else {
            scale = ' y no tiene escalas '
        }
        
        console.log('El vuelo con origen: ' + flight.from + ' y destino: ' + flight.to + ' tiene un coste de ' + flight.cost + '€' + scale)

         totalCostFlights += flight.cost
    })

    const lastFiveFlights = flights.slice(-5)

    console.log("Los últimos cinco vuelos son:")
    lastFiveFlights.forEach(flight => {
        console.log('id ' + flight.id + " con dirección a: " + flight.to)
    })
    
    
    console.log('El coste medio de los vuelos ' + Math.trunc(totalCostFlights / flights.length) + '€')
    
    console.log('Hay ' + flightsWithScale + ' vuelos con escalas')
}
  
skylabAirlinesFlights(flights)


