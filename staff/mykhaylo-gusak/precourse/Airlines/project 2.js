// (Los datos de los vuelos están al final del enunciado, podéis usarlos en vuestro código)

// Programa una inferfaz de usuario para una aerolinea (por terminal...). Esta aerolinea dispondrá de 10 vuelos para el 
// dia de hoy, para empezar, estos vuelos estarán declarados de manera global, cuando se llame a la función:

// Se preguntará por el nombre de usuario y dará la bienvenida.
// El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, 
// y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
// A continuación, el usuario verá el coste medio de los vuelos.
// También podrá ver cuantos vuelos efectúan escalas.
// Sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.

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

//Declaro variable vacia para el nombre de usuario
var userName 
//Creo una funcion para recibir el nombre por el usuario mediante un prompt
function getUserName () {
    userName = prompt('Insert your name please.', 'Name here.');
}
//Creo funcion que da la bienvenido mediante un alert
function welcome () {
    let message = 'Bienvenido Mr/Ms ' + userName + '.';
    alert(message);
}
//Creo funcion que retorna un mensaje 
function firstWelcome () {
    let message = 'Debajo, puede observar los vuelos de dia de hoy.';
    return message
}
//Creo funcion que muestra todos los vuelos y con su informacion perteneciente
function showFlights () {

    let showFlight = flights.map(function (element,position) {

        let message

        if (element.scale === false) {
             message = 'no realiza nunguna'
        } else {
            message = 'realiza una'
        }

        console.log('El vuelo con origen: ' + element.from + ',y destino ' + element.to + ' tiene un coste de ' + element.cost + '$' + ' y ' + message + ' escala.') 
    })    
}
//Creo funcion que calcula el precio medio de todos los vuelos
function getMidPrice () {
    //Declaro variable locales para poder hacer los calculos
    let total = 0;
    let flightsTimes = 0;
    let midPrice 

    let showMidPrice = flights.map(function (element) {

        total = total + element.cost;
        flightsTimes += 1

    })

    midPrice = (total / flightsTimes).toFixed(3);
    return  'El precio medio de los vuelos es de: ' +  midPrice + ' $' + '.'
}

//Creo funcion para ver que vuelos tiene escala
function showScale () {

    let flightsWitchEscale = 0;
    let escale = flights.map(function (element) {
        // Con el if compruebo si tiene escala o no
        if (element.scale === true) {
            flightsWitchEscale += 1
        }

    })
    return 'Hay ' + flightsWitchEscale + ' vuelos con escala.'
}
// Creo funcion para mostrar los ultimos vuelos
function showLastFlights () {

    let lastFlights = flights.map(function (element) {
        // Con el if compruebo si el id es mayor que 5
        if (element.id >= 5) {
            console.log('Los cinco ultimos vuelos del dia son con origen: ' + element.from + ' y destino: ' + element.to + '.' )
        }
    })
}
//Declaro todas las funciones en orden necesario
getUserName();
welcome();
console.log(firstWelcome());
showFlights();
console.log(getMidPrice());
console.log(showScale());
showLastFlights();