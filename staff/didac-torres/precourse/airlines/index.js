//Skylab Airlines MultiTool
// Didac Torres Ferrer

//Default Flights
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

//Functions

function userAcces(){
    var username=prompt("Insert your username: ");
    alert("Hi "+username+"!");
    if ((username.toLowerCase()).trim() === "admin"){
        return true;
    }
    else
    {
        return false;
    }
}

function showFlights(){
    var mostrarVuelo=[];
        for(var i=0;i<flights.length;i++){
    
            mostrarVuelo[i]= "*El vuelo con origen: "+flights[i].from+", y destino: "+flights[i].to+" tiene un coste de: "+flights[i].cost+" y "+flightScale(i)+" hace escala.\n"
        }
    alert(mostrarVuelo);
}

function flightScale(code){
    if(flights[code].scale === false){
        return "No";
    }
    else{
        return "Si";
    }
}

function flightMean(){
    var medAcum=0;

        flights.forEach(function(obj){
    
            medAcum += obj.cost;
         })
    
    res = medAcum/flights.length;
    alert("El coste medio de los vuelos es: " + res.toFixed(2));
}

function showScale(){
    var mostrarEscala=[];
    mostrarEscala[0]="Los vuelos con escala son: \n";
    var j=1;

    for(var i=0;i<flights.length;i++){
    
        if(flights[i].scale === true){ 
            mostrarEscala[j]= "*El vuelo con origen: "+flights[i].from+", y destino: "+flights[i].to+" tiene un coste de: "+flights[i].cost+" y "+flightScale(i)+" hace escala.\n";
            j++;
        }
    }
    
    alert(mostrarEscala);
}

function lastflights(){
    var mostrarUltimos=[];
    mostrarUltimos[0]="Los ultimos vuelos del dia son: \n";
    
    for(var i=1;i<=6;i++){
        var z = flights.length - i;
        mostrarUltimos[i]= "\n *El vuelo con origen: "+flights[z].from+", y destino: "+flights[z].to+" tiene un coste de: "+flights[z].cost+" y "+flightScale(z)+" hace escala."
    }

    alert(mostrarUltimos);
}

function createFlights(){

    if(flights.length<=16){
        var flightTo=prompt("Indique destino:");
        var flightFrom=prompt("Indique origen:");
        var flightCost=parseFloat(prompt("Indique coste:"));
        
        var createScale = confirm('El vuelo hace escala?');

        flights[flights.length]= {id: flights.length, to: flightTo, from: flightFrom, cost: flightCost, scale: createScale };    
    } 
    else{
        alert("Hay 15 vuelos programados. No puede introducir mas!");
    }
}

function deleteFlights(){
    var flightDelete=prompt("Indique ID del vuelo a eliminar:");
        
        
    for(var i=0;i<flights.length;i++){
    
        if (flights[i].id == flightDelete) {
            flights.splice(i,1);
            
        }
    }
}
        

//Code

userAcces();

//all
showFlights();
flightMean();
showScale();
lastflights();

//admin
createFlights();
deleteFlights();



