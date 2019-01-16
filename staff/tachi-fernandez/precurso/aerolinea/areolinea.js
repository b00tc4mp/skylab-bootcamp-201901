
var result = window.prompt("Hi! , Whats your name?")

console.log("Hi " + result + " ,you can see own flights")
console.log(" ")

//El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.


var flights = [
{id: 00, to: "New York", from: "Barcelona", cost: 700,scale: "no"},
{id: 01, to: "Los Angeles", from: "Madrid", cost: 1100,scale: "si"},
{id: 02, to: "Paris", from: "Barcelona", cost: 210,scale: "no"},
{id: 03, to: "Roma", from: "Barcelona", cost: 150,scale: "no" },
{id: 04, to: "London", from: "Madrid", cost: 200,scale: "no" },
{id: 05, to: "Madrid", from: "Barcelona", cost: 90,scale: "no" },
{id: 06, to: "Tokyo", from: "Madrid", cost: 1500,scale: "si" },
{id: 07, to: "Shangai", from: "Barcelona", cost: 800,scale: "si"},
{id: 08, to: "Sydney", from: "Barcelona", cost: 150,scale: "si"},
{id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150,scale: "no" }
]
 


 console.log("ºEl vuelo con origen " + flights[0].from + " y destino " + flights[0].to + " ,tendra un coste de " + flights[0].cost + " y " + flights[0].scale + " realiza una escala ")
 console.log("ºEl vuelo con origen " + flights[1].from + " y destino " + flights[1].to + " ,tendra un coste de " + flights[1].cost + " y " + flights[1].scale + " realiza una escala ")
 console.log("ºEl vuelo con origen " + flights[2].from + " y destino " + flights[2].to + " ,tendra un coste de " + flights[2].cost + " y " + flights[2].scale + " realiza una escala ")
 console.log("ºEl vuelo con origen " + flights[3].from + " y destino " + flights[3].to + " ,tendra un coste de " + flights[3].cost + " y " + flights[3].scale + " realiza una escala ")
 console.log("ºEl vuelo con origen " + flights[4].from + " y destino " + flights[4].to + " ,tendra un coste de " + flights[4].cost + " y " + flights[4].scale + " realiza una escala ")
 console.log("ºEl vuelo con origen " + flights[5].from + " y destino " + flights[5].to + " ,tendra un coste de " + flights[5].cost + " y " + flights[5].scale + " realiza una escala ")
 console.log("ºEl vuelo con origen " + flights[6].from + " y destino " + flights[6].to + " ,tendra un coste de " + flights[6].cost + " y " + flights[6].scale + " realiza una escala ")
 console.log("ºEl vuelo con origen " + flights[7].from + " y destino " + flights[7].to + " ,tendra un coste de " + flights[7].cost + " y " + flights[7].scale + " realiza una escala ")
 console.log("ºEl vuelo con origen " + flights[8].from + " y destino " + flights[8].to + " ,tendra un coste de " + flights[8].cost + " y " + flights[8].scale + " realiza una escala ")
 console.log("ºEl vuelo con origen " + flights[9].from + " y destino " + flights[9].to + " ,tendra un coste de " + flights[9].cost + " y " + flights[9].scale + " realiza una escala ")
 console.log(" ")


//A continuación, el usuario verá el coste medio de los vuelos.


var flightsTotalCost = 0
for (flight in flights){
flightsTotalCost += flights[flight].cost
}

var flightsAverageCost = flightsTotalCost/flights.length
console.log("La media del coste de todos los vuelos es " + flightsAverageCost)

console.log(" ")
//También podrá ver cuantos vuelos efectúan escalas.


var flightsScale = 0
for (flight in flights){
flightsScale += flights[flight].scale
}

console.log("Estos " + flightsScale + " vuelos no realizan ninguna escala:")

 console.log("·El vuelo con origen " + flights[1].to + " y destino " + flights[1].from + " ,tendra un coste de " + flights[1].cost)
 console.log("·El vuelo con origen " + flights[6].to + " y destino " + flights[6].from + " ,tendra un coste de " + flights[6].cost)
 console.log("·El vuelo con origen " + flights[7].to + " y destino " + flights[7].from + " ,tendra un coste de " + flights[7].cost)
 console.log("·El vuelo con origen " + flights[8].to + " y destino " + flights[8].from + " ,tendra un coste de " + flights[8].cost)


console.log(" ")



//Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.


var  Destination = []

for (var i =  flights.length-1;i>=flights.length-5;i--){
	Destination.push(flights[i].to)
}

console.log("-El destino del vuelo con origen " + flights[5].from + " es " + Destination[4])
console.log("-El destino del vuelo con origen " + flights[6].from + " es " + Destination[3])
console.log("-El destino del vuelo con origen " + flights[7].from + " es " + Destination[2])
console.log("-El destino del vuelo con origen " + flights[8].from + " es " + Destination[1])
console.log("-El destino del vuelo con origen " + flights[9].from + " es " + Destination[0])
