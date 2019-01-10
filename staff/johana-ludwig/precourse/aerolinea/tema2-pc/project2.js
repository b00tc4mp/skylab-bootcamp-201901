/*
Programa una inferfaz de usuario para una aerolinea (por terminal...). 
Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, para empezar, 
estos vuelos estarán declarados de manera global, cuando se llame a la función:

1. Se preguntará por el nombre de usuario y dará la bienvenida.
2. El usuario visualizará todos los vuelos disponibles de una forma amigable: 
   El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
3. A continuación, el usuario verá el coste medio de los vuelos.
4. También podrá ver cuantos vuelos efectúan escalas.
5. Sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, 
muestra al usuario sus destinos.
*/

let flights = [
  { id: 00, to: "Bilbao", from: "Barcelona", cost: 1600, scale: false },
  { id: 01, to: "New York", from: "Barcelona", cost: 700, scale: false },
  { id: 02, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },
  { id: 03, to: "Paris", from: "Barcelona", cost: 210, scale: false },
  { id: 04, to: "Roma", from: "Barcelona", cost: 150, scale: false },
  { id: 05, to: "London", from: "Madrid", cost: 200, scale: false },
  { id: 06, to: "Madrid", from: "Barcelona", cost: 90, scale: false },
  { id: 07, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },
  { id: 08, to: "Shangai", from: "Barcelona", cost: 800, scale: true },
  { id: 09, to: "Sydney", from: "Barcelona", cost: 150, scale: true },
  { id: 10, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false }
];

function printFlightData() {
  document.write("<h1>Este es el resumen de los vuelos de hoy</h1>");

  flights.forEach(element => {
    document.write(`El vuelo con origen: ${element.from} y destino: ${element.to} 
    tiene un coste de ${element.cost}  euros y no realiza ${element.scale ? "ninguna" : ""} 
    escala.</br></br>`);
  });
}

function printCostRatio() {
  let acc = 0;
  flights.forEach(element => {
    acc += element.cost;
  });

  let ratio = Math.round((acc / flights.length) * 100) / 100;

  document.write(
    `<strong>El precio medio de los vuelos es de: ${ratio} euros.`
  );
}

function printFlightScale() {
  let filteredScale = flights.filter(element => {
    return element.scale === true;
  });
  filteredScale = filteredScale.length;
  document.write(`Hay un total de ${filteredScale} vuelos que hacen escala.`);
}

function printLastFlightsOfDay() {
  let sliceFlights = flights.slice(flights.length - 5, flights.length);
  document.write("Los últimos 5 vuelos del día tienen como destino: </br>");
  sliceFlights.forEach(element => {
    document.write(`${element.to}<br>`);
  });
}

function skylabAirlines() {
  let guessName = prompt("Por favor, introduce tu nombre");
  alert(guessName.toUpperCase() + ", te damos la bienvenida a Skylab Airlines"
  );

  printFlightData();
  document.write("<h1>Información adicional:</h1>");
  printCostRatio();
  document.write("</br></br>");
  printFlightScale();
  document.write("</br></br>");
  printLastFlightsOfDay();
}

skylabAirlines();
