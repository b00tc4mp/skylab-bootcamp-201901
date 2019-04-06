/*
Skylab Airlines!!!!!!


Programa una inferfaz de usuario para una aerolinea (por terminal...). Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, para empezar, estos vuelos estarán declarados de manera global, cuando se llame a la función:

Se preguntará por el nombre de usuario y dará la bienvenida.
El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
A continuación, el usuario verá el coste medio de los vuelos.
También podrá ver cuantos vuelos efectúan escalas.
Sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.
*/

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



function userInterface(){

var user=prompt("Introduce your name and surname: ");

console.log("WELCOME TO SKYLAB AIRLINES: "+user+", please find the different flights for today here below: ");

var result=""
    for(i=0;i<flights.length;i++){
  
        var scale=flights[i].scale;
    
        if(scale==true){
        result="€ y se realizará una escala.";
        }else{
        result="€ y no realiza ninguna escala.";
        }
 
    console.log("   - El vuelo con origen: "+flights[i].from+", y destino: "+flights[i].to+" tiene un coste de "+flights[i].cost+result);
    }

    var suma=0;
    var promedio=0
    for(i=0;i<flights.length;i++){
        suma= suma+flights[i].cost;
        promedio=suma/(i+1);
    }

    console.log("the average cost of the flights is: "+promedio.toFixed(2)+"€");

    console.log("The flights with Scale are:")

    for(i=0;i<flights.length;i++){
  
        var scale=flights[i].scale;
    
        if(scale==true){
            console.log("   - From "+flights[i].from+" to "+flights[i].to);
        }
    }

    console.log("The last 5 flights destinations of this day are: ")

    for(i=0;i<flights.length;i++){
  
        if(flights[i].id>05){
            console.log("   - to "+flights[i].to);
        }
    }
}

userInterface();
