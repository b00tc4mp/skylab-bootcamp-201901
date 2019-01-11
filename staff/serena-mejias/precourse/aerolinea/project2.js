/*Programa una inferfaz de usuario para una aerolinea (por terminal...). 
Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, para empezar, 
estos vuelos estarán declarados de manera global, cuando se llame a la función:

Se preguntará por el nombre de usuario y dará la bienvenida.
El usuario visualizará todos los vuelos disponibles de una forma amigable: 
El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ 
y no realiza ninguna escala.
A continuación, el usuario verá el coste medio de los vuelos.
También podrá ver cuantos vuelos efectúan escalas.
Sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, 
muestra al usuario sus destinos.*/

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

function Welcome() {
    let name = prompt('Whats your name?');
    return `Welcome to Skylab airlines ${name}!`;
}
let totCost = 0;
let countScale = 0;
let vuelos = [];
let ultVuelos = [];
function showInfo() {
    flights.forEach((element,i) => {
        if(element['scale']===true) {
            let escala = 'realiza escala'
            countScale = countScale + 1;
        } else {
            escala = 'no realiza ninguna escala'
        }
        vuelos.push(`El vuelo con origen: ${element['from']}, y destino: ${element['to']} 
        tiene un coste de ${element['cost']}€ y ${escala}.`);
        totCost = totCost + element['cost'];
        if(element.id>=6){
            ultVuelos.push(`Los últimos vuelos del día son con destino: ${element['to']}`);
            }
    })
    vuelos.forEach((element)=> {
        console.log(element);
    });
    ultVuelos.forEach((element)=>{
        console.log(element);
    })
    console.log(`El coste medio de la oferta de vuelos es ${Math.round(totCost / flights.length)}€.`);
    console.log(`Se ofertan ${countScale} vuelos con escala.`);
}
console.log(Welcome('Serena'));
showInfo();
