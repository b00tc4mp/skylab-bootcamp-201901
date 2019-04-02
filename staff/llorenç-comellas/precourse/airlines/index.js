/* Programa una inferfaz de usuario para una aerolinea (por terminal...). Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, 
para empezar, estos vuelos estarán declarados de manera global, cuando se llame a la función:

 - Se preguntará por el nombre de usuario y dará la bienvenida.

- El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino: 
Madrid tiene un coste de XXXX€ y no realiza ninguna escala.

- A continuación, el usuario verá el coste medio de los vuelos.

-También podrá ver cuantos vuelos efectúan escalas.

- Sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos. */

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

function airlines(){

    let name = prompt('Com et dius?')
    console.log('Hola ' + name + '. Aquests son els vols disponibles per avui:')

    let showFlights = ''
    let showScale = ''
    let costMitja = 0
    let trueScale = ''
    let lastFlights = ''
    

    for(i=0;i< flights.length; i++){
        if(flights[i].scale === false){
            showScale = 'no realitza escala'
        }else{
            showScale = 'realitza escala'
        }
       showFlights += 'El vol amb origen: ' + flights[i].from + ' i destinació: ' + flights[i].to + ' te un cost de ' + flights[i].cost + '€' + ' i ' + showScale + '\n'
        
        costMitja += flights[i].cost / flights.length

        if(flights[i].scale === true){
            trueScale +=  'El vol amb origen: ' + flights[i].from + ' i destinació: ' + flights[i].to + '\n'
        }
    
    }
    for(j=6;j< flights.length; j++){
        lastFlights += flights[j].to + '\n'
    }

    console.log(showFlights) 
    console.log('El cost mitjà dels vols es de: ' + costMitja.toFixed(2) + '€')
    console.log('Els vols amb escala son: ' + '\n' + trueScale)
    console.log('La destinació dels últims cinc vols son:' + '\n' + lastFlights)
   
}

airlines()