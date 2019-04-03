/* Programa una inferfaz de usuario para una aerolinea (por terminal...). Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, para empezar, estos vuelos estarán declarados de manera global, cuando se llame a la función:

Se preguntará por el nombre de usuario y dará la bienvenida.
El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
A continuación, el usuario verá el coste medio de los vuelos.
También podrá ver cuantos vuelos efectúan escalas.
Sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos. */

let flights = [
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

function showFlights(data) {
    let allFlights = '';
    // Podría cambiarlo para hacerlo mediante un forEach igual que en la función showScaleFlights.
    for (let i = 0; i < data.length; i++) {
        allFlights += `El vuelo con origen: ${data[i].from}, y destino: ${data[i].to} tiene un coste de ${data[i].cost}€`;
        if (data[i].scale) {
            allFlights += ' con escala.\n'
        } else {
            allFlights += ' y no realiza ninguna escala.\n'
        }
    }
    return allFlights;
}

function showAvgCost(data) {
    let sum = 0;
    data.forEach(function(flight){
        sum += flight.cost; 
    }, sum);
    const average = (sum / data.length).toFixed(2);
    return `El coste medio de los vuelos es ${average} €`;
}

function showScaleFlights(data) {
    let scaleFlights = [];
    data.forEach(function(flight){
        if (flight.scale) {
            scaleFlights.push(flight);
        }
    });

    return showFlights(scaleFlights);
}

function showLastFlights(data) {
    return showFlights(data.slice(-5));
}

function orderFlightId(data) {
    return data.sort((a, b) => a.id - b.id);
}

function welcome(name) {
    return `Bienvenido ${name}!`;
}

function showOptions() {
    let msg = '';
    msg += 'OPCIONES:\n';
    msg += '1. Mostrar todos los vuelos disponibles.\n';
    msg += '2. Mostrar Coste Medio de los vuelos.\n';
    msg += '3. Mostrar vuelos con escala.\n';
    msg += '4. Mostrar los últimos 5 vuelos.\n';
    msg += '5. Salir.';
    return msg;
}

function skylabAirlines(flights) {
    let user;
    do {
        user = prompt("Por favor, como te llamas?");
    } while (!user);
    console.log(welcome(user));
    
    let option = 0;
    do {
        console.log();
        option = prompt(showOptions() + '\n\n' + 'Seleccione la opción que desea realizar: ')
        switch (option) {
            case '1':
                console.log(showFlights(orderFlightId(flights)));
                break;
            
            case '2':
                console.log(showAvgCost(orderFlightId(flights)));
                break;
    
            case '3':
                console.log(showScaleFlights(orderFlightId(flights)));
                break;
    
            case '4':
                console.log(showLastFlights(orderFlightId(flights)));
                break;
            
            case '5':
                break;

            default:
                console.log('Por favor, seleccione una opción válida.');
                break;
        }   
    } while (option != 5)

    return 'Gracias por utilizar nuestro servicio, hasta otra!';
}

skylabAirlines(flights);

//skylabAirlines(flights) Te recomiendo poner ya la llamda que inicia la ejecución, así la persona que lo mira no tiene que buscar cual es la función que tiene que llamar.
//Las funciones independientes de skylabAirlines, las podrías poner fuera de la función principal, para que así sean realmente independientes. 
//Te recomendaría mostrar el menú de navegación en el prompt, y no con un console.log(), creo que así mejoraría la experiencia de usuario. 