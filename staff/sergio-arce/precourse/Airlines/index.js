//Mini-Proyecto del tema 2

/*Skylab Airlines! ✈️🛩
(Los datos de los vuelos están al final del enunciado, podéis usarlos en vuestro código)

Programa una inferfaz de usuario para una aerolinea (por terminal...). 
Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, para empezar, 
estos vuelos estarán declarados de manera global, cuando se llame a la función:
----------------------------------------------------------------------------------
-Se preguntará por el nombre de usuario y dará la bienvenida.
El usuario visualizará todos los vuelos disponibles de una forma amigable:
El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ 
y no realiza ninguna escala.
A continuación, el usuario verá el coste medio de los vuelos.
También podrá ver cuantos vuelos efectúan escalas.
Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, 
muestra al usuario sus destinos.
-------------------------------------------------------------------*/

var flights = [
    { id: 00, to: "New York", from: "Barcelona", cost: 700, scale: false },
    { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },
    { id: 02, to: "Paris", from: "Barcelona", cost: 210, scale: false },
    { id: 03, to: "Roma", from: "Barcelona", cost: 150, scale: false },
    { id: 04, to: "London", from: "Madrid", cost: 200, scale: false },
    { id: 05, to: "Madrid", from: "Barcelona", cost: 90, scale: false },
    { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },
    { id: 07, to: "Shangai", from: "Barcelona", cost: 800, scale: true },
    { id: 08, to: "Sydney", from: "Barcelona", cost: 150, scale: true },
    { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false }
  ];
  
  
  // funcion pricipal

  function SkylabAirlines() {
    var name = getName();
    if (name === undefined) { return }
    alert(`${name.trim().toUpperCase()}\nSkylab Airlines!!! le da la bienvenida!!! ✈✈✈`);
    
    // mostramos al usuario todos los vuelos sin scala
    alert(`Estos son los vuelos sin escala para el dia de hoy!!!`);
    console.log(`=========================== Non-stop Flights ===========================`);
    // vuelos sin escala
    var _nonStopFlights = nonStopFlights(flights);
    // imprimimos los vuelos sin escala
    printFlights(_nonStopFlights);
    
    //promedio de precios total de vuelos 
    var _averageFlights = averageFlights(flights);
    alert(`Este es el promedio de precios de los vuelos ${_averageFlights}€`);
    console.log(`=====================  Average price flights ${_averageFlights}€ =======================`);
    
    // mostramos al usuario todos los vuelos que tienen escala
    alert(`Acontinuacion le mostramos todos los vuelos que tienen alguna escala`);
    console.log(`========================= Flights Whith Scale ===========================`);
    // vuelos con escala
    var _flightsWhithScale = flightsWhithScale(flights);
    // imprimimos los vuelos con escala
    printFlights(_flightsWhithScale);
    
    // mostramos al usuario los últimos 5 vuelos del día
    alert(`Estos son los ultimos 5 vuelos del dia!!!`);
    // almacenamos los ultimos 5 vuelos
    var _lastFlightsDay = lastFlightsDay(flights, 5);
    console.log(`======================== Last Flights of the day  ========================`);
    // imprimimos los 5 ultimos vuelos 
    printFlights(_lastFlightsDay);
    
    alert(`${name} gracias por volar con Skylab Airlines!!!`);
    return console.log(`${name} gracias por volar con Skylab Airlines!!!`);
  }
  
  // funcion que pide el nombre
  var getName = name => {
    do {
      var name = prompt(`Introduzca su nombre`);
      if (name === null) { return }
    } while (!isNaN(name));
    return name;
  }
  
  // funcion q imprime vuelos
  function printFlights(flightsPrint) {
    flightsPrint.forEach(function (obj) {
      console.log(`ID: ${obj.id} - Origen: ${obj.from} - Destino: ${obj.to} - Coste: ${obj.cost} - Escala ${obj.scale}`);
    });
    console.log(`=========================================================================`);
  }
  
  // funcion vuelos sin escala
  function nonStopFlights(flights) {
    // filtramos todos los vuelos sin escala 
    return flights.filter(flight => flight.scale == false);
  }
  
  // funcion promedio de precio
  function averageFlights(flights) {
  // almacenamos en un array todos los precios con map y luego lo sumamos con reduce 
    var accPriceFlights = flights.map(flight => flight.cost).reduce((acc, cost) => acc + cost);
    // retornamos el promedio de precio
    return accPriceFlights / flights.length;
  }
  
  // funcion vuelos con escala
  function flightsWhithScale(flights) {
    // filtramos todos los vuelos con escala
    return flights.filter(flight => flight.scale == true)
  }
  
  // funcion  ultimos vuelos del dia 
  function lastFlightsDay(flights, number) {
    return flights.slice(flights.length - number)
  }
  
//   llamada a la funcion principal
  SkylabAirlines() 