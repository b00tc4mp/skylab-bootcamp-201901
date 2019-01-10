// Skylab Airlines!
// Mini-Proyecto del tema 2

var flights = [
      {id: 00, to: "New York", from: "Barcelona", cost: 700,scale: false},
      {id: 01, to: "Los Angeles", from: "Madrid", cost: 1100,scale: true},
      {id: 02, to: "Paris", from: "Barcelona", cost: 210,scale: false},
      {id: 03, to: "Roma", from: "Barcelona", cost: 150,scale: false},
      {id: 04, to: "London", from: "Madrid", cost: 200,scale: false},
      {id: 05, to: "Madrid", from: "Barcelona", cost: 90,scale: false},
      {id: 06, to: "Tokyo", from: "Madrid", cost: 1500,scale: true},
      {id: 07, to: "Shangai", from: "Barcelona", cost: 800,scale: true},
      {id: 08, to: "Sydney", from: "Barcelona", cost: 150,scale: true},
      {id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150,scale: false},
      {id: 10, to: "Tel-Aviv", from: "Madrid", cost: 150,scale: false},
      {id: 11, to: "Tel-Aviv", from: "Madrid", cost: 150,scale: false},
      {id: 12, to: "Tel-Aviv", from: "Madrid", cost: 150,scale: false},
      {id: 13, to: "Tel-Aviv", from: "Madrid", cost: 150,scale: false},
      {id: 14, to: "Tel-Aviv", from: "Madrid", cost: 150,scale: false},
];

function skylabAirlines(flights){
    var msg = '';
    var totalCost = 0;
    var name = prompt('¿Cuál es tu nombre?');
    console.log(`Bienvenido ${name}`);
    flights.forEach(flight => console.log(`El vuelo con origen: ${flight.from} y destino: ${flight.to} tiene un coste de ${flight.cost}€ y ${flight.scale ? 'no realiza ninguna' : 'realiza'} escala.`));
    flights.forEach(flight => totalCost += flight.cost);
    console.log(`Coste medio de vuelos: ${totalCost/flights.length}€`);
    console.log(`Nº de vuelos que realizan escala: ${(flights.filter( flight => flight.scale )).length}`);
    msg += 'Destinos de los últimos 5 vuelos del día:';
    for(var i = flights.length - 1; i >= 5; i--) {
        msg += flights[i].to + ', ';
    }
    msg = msg.trim().slice(0,-1);
    console.log(msg);
}

// Skylab Airlines!
// PRO!
// El programa se inicia mediante la llamada a la función skylabAirlinesMain()


var FLIGHT_MAX = 15; // Nº máximo de vuelos a guardar

var flights = [
  {id: 00, to: "New York", from: "Barcelona", cost: 700,scale: false},
  {id: 01, to: "Los Angeles", from: "Madrid", cost: 1100,scale: true},
  {id: 02, to: "Paris", from: "Barcelona", cost: 210,scale: false},
  {id: 03, to: "Roma", from: "Barcelona", cost: 150,scale: false},
  {id: 04, to: "London", from: "Madrid", cost: 200,scale: false},
  {id: 05, to: "Madrid", from: "Barcelona", cost: 90,scale: false},
  {id: 06, to: "Tokyo", from: "Madrid", cost: 1500,scale: true},
  {id: 07, to: "Shangai", from: "Barcelona", cost: 800,scale: true},
  {id: 08, to: "Sydney", from: "Barcelona", cost: 150,scale: true},
  {id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150,scale: false}
];

function skylabAirlinesMain(){
    sayHi();
    var rol = getRol();
    var option = rol;
    do {
      showFlights(flights);
      if (rol === 'ADMIN') {
        option = showMenuAdmin();
        adminCrud(option);
      }

      if (rol === 'USER') {
        if (flights.length === 0) {
            console.log('No hay vuelos disponibles. Entra como administrador y crea alguno antes de buscar.');
            option = '0';
        } else {
            option = showMenuUser();
            if (option !== '0') {
              var price = getPrice();
              var results = searchResults(option, price);
              if (results){removeAndBuy('comprar');}
            }
        }
      }
    } while (option !== '0');
    sayGoodBye();
}

function getRol(){
  var exit = false;
  do {
    var option = prompt('¿Eres ADMIN o USER? \n\n--- Pulsa 0 para SALIR del programa ---');
    if ((option == 'ADMIN') || (option == 'USER') || (option == '0')) {
        exit = true;
        return option;
    } else {
        console.log('Introduce una de las opciones disponibles o pulsa 0 para salir del programa');
    }
  } while (!exit);
}

function sayHi(){
  var exit = false;
  do {
    var name = prompt('¿Cuál es tu nombre?');
  } while (name === '');
  console.log(`Bienvenido ${name}`);
}

function sayGoodBye(){
  console.log(`Gracias por visitarnos.`);
}

function removeAndBuy(action = 'eliminar'){
  do {
    var id = prompt(`Introduce el ID del vuelo que quieres ${action}`);
    var idNumerical = parseInt(id);
    var indexToRemove = flights.findIndex( flight => flight.id == idNumerical);
    if (indexToRemove !== -1) {
      flights.splice(indexToRemove, 1);
      (action == 'eliminar') ? console.log(`Vuelo con ID ${idNumerical} borrado`) : console.log(`Vuelo con ID ${idNumerical} comprado`) ;
    } else {
      console.log(`No se ha encontrado ningún vuelo con ese ID`);
    }
  } while (indexToRemove === -1);
}

function showMenuUser(){
  var exit = false;
  do {
    var msg = '';
    msg += 'Bienvenido a la búsqueda por precio';
    msg += '\n¿Cómo quieres buscar? (Pulsa el número de cada opción)';
    msg += '\n1 - Precio MÁXIMO - compra vuelos inferiores a un precio';
    msg += '\n2 - Precio MÍNIMO - compra vuelos con precio superior';
    msg += '\n3 - Compre vuelos con el MISMO precio';
    msg += '\n\n--- Pulsa 0 para SALIR del programa ---';
    var option = prompt(msg);
    if ((option == '1') || (option == '2') || (option == '3') || (option == '0')) {
        exit = true;
        return option;
    } else {
        console.log('Introduce una de las opciones disponibles o pulsa 0 para salir del programa');
    }
  } while (!exit);
}

function getPrice(){
  do {
    var price = prompt('\n\n\nIntroduce un precio para iniciar la búsqueda');
    price = price.replace(',', '.'); // aceptamos números con puntos y con comas
    price = parseFloat(price);
    if (isNaN(price)){ console.log('Introduce un número por favor.') }
  } while (isNaN(price));
  return price;
}

function searchResults(optionUser, price){
    switch (optionUser) {
      case '1': // 1 - Precio MÁXIMO - compra vuelos inferiores a un precio
          var flightsBellow = flights.filter(flight => flight.cost < price);
          if (flightsBellow.length > 0) {
            console.log(`Estos son los vuelos con tarifa por debajo de ${price}€`);
            showFlights(flightsBellow);
            return true;
          } else {
            console.log(`No se han encontrado vuelos por debajo de ${price}€`);
            return null;
          }
          break;
      case '2': // 2 - Precio MÍNIMO - compra vuelos con precio superior
          var flightsAbove = flights.filter(flight => flight.cost > price);
          if (flightsAbove.length > 0) {
            console.log(`Estos son los vuelos con tarifa por encima de ${price}€`);
            showFlights(flightsAbove);
            return true;
          } else {
            console.log(`No se han encontrado vuelos por encima de ${price}€`);
            return null;
          }
      break;
      case '3': // 3 - Compre vuelos con el MISMO precio
          var flightsAbove = flights.filter(flight => flight.cost == price);
          if (flightsAbove.length > 0) {
            console.log(`Estos son los vuelos con un precio de ${price}€`);
            showFlights(flightsAbove);
            return true;
          } else {
            console.log(`No se han encontrado vuelos de ${price}€`);
            return null;
          }
    }
}

function createFlight(flights){
  var msg = (flights.length == FLIGHT_MAX) ? `No puedes guardar más vuelos` : `Aún puedes guardar ${FLIGHT_MAX - flights.length} vuelos`;
  console.log(`Por ahora tienes ${flights.length} vuelos guardados. ${msg}`);
  if (flights.length < FLIGHT_MAX) {
    var id = generateValidId(flights);
    var to = getTo();
    var from = getFrom();
    var cost = getCost();
    var scale = getScale();
    flights.push({id, to, from, cost, scale});
    console.log(`¡Nuevo vuelo con ID ${id} creado!`);
  } else {
    alert(`Disco lleno de vuelos. Prueba borrar primero.`);
  }
  return flights;
}

function showMenuAdmin(){
  var exit = false;
  do {
    var msg = '';
    msg += '¿QUÉ QUIERES HACER? (Pulsa el número de cada opción)';
    msg += '\n1. CREAR nuevos vuelos';
    msg += '\n2. ELIMINAR vuelos.';
    msg += '\n\n--- Pulsa 0 para SALIR del programa ---';
    var option = prompt(msg);
    if ((option == '1') || (option == '2') || (option == '0')) {
        exit = true;
        return option;
    } else {
        console.log('Introduce una de las opciones disponibles o pulsa 0 para salir del programa');
    }
  } while (!exit);
}

function showFlights(flights){
  var msg = '';
  var totalCost = 0;
  if (flights.length !== 0) {
    console.log(`\n*********Tenemos ${flights.length} vuelos en SKYLAB Airlines*********\n\n`);
    flights.forEach((flight,i) => msg += `-ID: ${flight.id}\t-ORIGEN: ${flight.from}\t-DESTINO: ${flight.to}\t-COSTE: ${flight.cost.toFixed(2)}€\t-ESCALA: ${flight.scale}\n`);
    console.log(msg);
    flights.forEach(flight => totalCost += flight.cost);
    console.log(`Coste medio: ${(totalCost/flights.length).toFixed(2)}€`);
  } else {
    console.log('No tenemos vuelos disponibles');
  }
}

function adminCrud(option){
    switch (option) {
      case '1': // 1. CREAR nuevos vuelos
          flights = createFlight(flights); // llamamos a crear vuelos modificando la variable global
          break;
      case '2': //2. ELIMINAR vuelos
        if (flights.length !== 0){
            removeAndBuy();
            //showFlights(flights);
        }
        break;
    }
}

function getTo(){
  do {
    var to = prompt('¿Cuál es el destino del vuelo?');
    if (to === ''){ console.log('Introduce un nombre de ciudad') }
  } while (to === '');
  return to;
}

function getFrom(){
  do {
    var from = prompt('¿De qué ciudad sale?');
    if (from === ''){ console.log('Introduce un nombre de ciudad') }
  } while (from === '');
  return from;
}

function getCost(){
  do {
    var cost = prompt('Introduce la tarifa');
    cost = cost.replace(',', '.');
    cost = parseFloat(cost);
    if (isNaN(cost)){ console.log('Introduce un número por favor.') }
  } while (isNaN(cost));
  return cost;
}

function getScale(){
  do {
    var scale = prompt('¿Realiza alguna escala? (y/n)');
    if ((scale !== 'y') && (scale !== 'n')){ console.log('Introduce "y" para sí o "n" para no.');}
  } while ((scale !== 'y') && (scale !== 'n'));
  return (scale === 'y');
}

function generateValidId(flights){
  var exit = false;
  var i = 0;
  var idArray = flights.map(flight => flight.id);
  do {
      for (i; i < idArray.length; i++) {
        if (!idArray.includes(i)){
          return i;
        }
      }
  } while (exit);
  return i;
}
