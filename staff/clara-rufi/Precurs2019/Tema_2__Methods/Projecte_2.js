/*Skylab Airlines! ✈️🛩

Programa una inferfaz de usuario para una aerolinea (por terminal...). Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, 
para empezar, estos vuelos estarán declarados de manera global, cuando se llame a la función:

Se preguntará por el nombre de usuario y dará la bienvenida.
El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, 
y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
A continuación, el usuario verá el coste medio de los vuelos.
También podrá ver cuantos vuelos efectúan escalas.
Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.*/

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

function welcomeUser(){
    var name_user = prompt("Hola! Cómo se llama?")
    if (name_user === "" ) {
        alert("Entre un nombre válido");
        welcomeUser()
    } else {
        alert( "Bienvenido " + name_user + " !!");
    }   
        
}
welcomeUser(); 

function dailyflights(){
    alert ("Información de los vuelos: ")
    infoFlights = "";
    for (var i=0; i<flights.length; i++){
        if (flights[i].scale === false){
            escala = " y no realiza ninguna escala."
        }else{
            escala = " y realiza una escala."         
        }
        infoFlights += ("El vuelo con origen " + flights[i].from +  " y destino " + flights[i].to + ", tiene un coste de " + 
        flights[i].cost + escala + "\n");
    }
    alert(infoFlights);

    var costeTotal = 0
    for (var i=0; i<flights.length; i++){
        costeTotal += flights[i].cost
    } 
	var costeMedio = Math.round((costeTotal/flights.length)*100)/100
    alert("El coste medio de los vuelos es de " + costeMedio + " €");
    numEscalas = 0;
    for (var i=0; i<flights.length; i++){
        if (flights[i].scale === true){
            numEscalas += 1
        }
    }
    alert("Hoy, un total de " + numEscalas + " vuelos, realizan escalas"); 
    var destinacion = []
    for (var i=6; i<flights.length; i++){
        destinacion.push(" " + flights[i].to);
        }      
    alert( "Los 5 últimos vuelos de hoy, tienen como destinación: " + destinacion)
    alert ("Gracias por su visita!")
}
    
dailyflights();





