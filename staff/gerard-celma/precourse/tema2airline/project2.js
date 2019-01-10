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

var scaleFlights = [];

function airline() {
    var user = prompt("Por favor, introduce tu nombre para que nos dirigamos a ti.");
    alert("Hola " + user + "! A continuación te mostraremos los vuelos disponibles por consola.");
    
    // Print flights
    for(var i = 0; i<flights.length; i++) {
        var escala = flights[i].scale;
        if(escala) {
            scaleFlights.push(flights[i]);
            console.log("El vuelo con origen " + flights[i].from + " y destino " + flights[i].to + " tiene un coste de " + flights[i].cost + "€ y realiza escala.");
        } else {
            console.log("El vuelo con origen " + flights[i].from + " y destino " + flights[i].to + " tiene un coste de " + flights[i].cost + "€ y no realiza ninguna escala.");
        }
    }
    
    // Print average flights cost
    var total = 0;
    for (var i = 0; i<flights.length; i++) {
        total = total + flights[i].cost;
    }
    var average = total / flights.length;
    console.log("---------------------------------------------\nEl coste medio de los vuelos es de " + average.toFixed(2) + "€.\n---------------------------------------------");

    // Print flights with scale
    console.log("---------------------------------------------\nHay un total de " + scaleFlights.length + " vuelos que realizan escala:");
    for (var i = 0; i<scaleFlights.length; i++) {
        if(i == scaleFlights.length - 1) {
            console.log((i+1)+ "º: El vuelo con origen " + scaleFlights[i].from + " y destino " + scaleFlights[i].to + "\n---------------------------------------------");
        } else {
            console.log((i+1)+ "º: El vuelo con origen " + scaleFlights[i].from + " y destino " + scaleFlights[i].to);
        }
    }

    // Print last 5 flights
    console.log("---------------------------------------------\nLos últimos vuelos del dia vuelan a:")
    for (var i = flights.length - 5; i<flights.length; i++) {
        if(i == flights.length - 1) {
            console.log("--> " + flights[i].to + "\n---------------------------------------------");
        } else {
            console.log("--> " + flights[i].to);
        }
    }
}

airline();