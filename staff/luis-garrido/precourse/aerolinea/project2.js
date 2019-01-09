// SKYLAB AIRLINES! 2.0 PRO Version!!

// 

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
]
// console.log(flights[0].to) //output: New York

// Se preguntará por el nombre de usuario y dará la bienvenida.
var username = prompt("Bienvenido a Skylab Airlines. ¿Cómo te llamas?", "John Doe");

function welcome() {
	console.log("Hola de nuevo, " + username + ". Estos son nuestros vuelos para hoy:");
}

function flightsList() {
	// El usuario visualizará todos los vuelos disponibles de una forma amigable
	// El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
	var scaleCount = 0;
	flights.forEach(function(element) {
		if (element.scale==false) {
			console.log(element.id + " // El vuelo con origen " + element.from + " y destino " + element.to + " tiene un coste de " + element.cost + "€ y no realiza ninguna escala.");
		}
		else {
			scaleCount++
			console.log(element.id + " // El vuelo con origen " + element.from + " y destino " + element.to + " tiene un coste de " + element.cost + "€ y realiza escalas.");
		}
	});

	// A continuación, el usuario verá el coste medio de los vuelos.
	var total = 0;
	flights.forEach(function(element) {
		total += element.cost;
	});
	averageCost = total/flights.length;
	console.log("El coste medio de los vuelos es de " + averageCost + "€.");

	// También podrá ver cuantos vuelos efectúan escalas.

	console.log("En total, " + scaleCount + " vuelos realizan escalas.");

	// Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.

	var output = "Los 5 últimos vuelos previstos para hoy tienen destino a ";
	for (var i = flights.length-5; i < flights.length; i++) {
		output += flights[i].to + ", ";
	}
	console.log(output.slice(0, -2)+".");
}

function mainProgram() {
	welcome();
	flightsList();
}

mainProgram();

// Después de ver toda la información el programa pedirá al usuario si es ADMIN/USER,
// dependiendo de la elección, el programa se comportará de la siguiente manera:

var levelUser = "";
while (levelUser!="ADMIN" && levelUser!="USER") {
	var levelUser = prompt("¿Eres administrador o usuario? Responde con ADMIN / USER", "USER").toUpperCase();
}

// Si eres ADMIN, la función debería permitir:
// Poder crear, más vuelos, pidiendo la información por prompt(), sin poder pasar de 15 vuelos, si se intenta introducir uno más, saltará un alert().
// Poder eliminar vuelos mediante el ID.
function NewFlight(to, from, cost, scale) {
	this.id = flights[flights.length-1].id+1;
    this.to = to;
    this.from = from;
    this.cost = cost;
    this.scale = scale;
}

if (levelUser=="ADMIN") {
	var adminOptions = "";
	console.log("Te has identificado como ADMINISTRADOR.");
	while (adminOptions!="EXIT") {
		var adminOptions = prompt("¿Introducir vuelo nuevo? ¿Borrar vuelo? ¿Salir? Responde con NEW / DEL / EXIT", "EXIT").toUpperCase();
		if (adminOptions=="NEW") {
			console.log("Has seleccionado introducir nuevo vuelo");
			if (flights.length>14) {
				alert("Imposible introducir más vuelos, no te quedan aviones.");
			}
			else {
				var p = new	NewFlight(prompt("Introduce destino:"), prompt("Introduce origen:"), Number(prompt("Introduce el precio:")), prompt("¿Hace escalas? TRUE / FALSE"));
				flights.push(p);
			}
			flightsList();
		}
		else if (adminOptions=="DEL") {
			console.log("Has seleccionado borrar vuelo");
			var idToDel = prompt("Introduce ID del vuelo a eliminar:");
			flights = flights.filter(function (fl) {
				return (fl.id!=idToDel);
			});
			var newId = 0;
			flights.forEach(function(element) {
				element.id = newId;
				newId++;
			});
			flightsList();
		}	
		else if (adminOptions=="EXIT") {
			console.log("Desconectado del sistema. ¡Hasta la próxima!");
		}
	}
}

// Si eres USER la función debería permitir:
// Buscar por precio ( más alto, más bajo o igual), el usuario debería mostrar los datos de los vuelos encontrados
// y, indicando el ID, el programa responderá: "Gracias por su compra, vuelva pronto."

else {
	var userOptions = "";
	console.log("Te has identificado como USUARIO.");
	while (userOptions!="EXIT") {
		var userOptions = prompt("SEARCH BUY EXIT", "SEARCH").toUpperCase();
		if (userOptions=="SEARCH") {
			console.log("buscar");
			var searchOpt = "";
			while (searchOpt!="MAX" && searchOpt!="MIN" && searchOpt!="EQUAL") {
				var searchOpt = prompt("¿Buscar precio máximo, mínimo o exacto? Responde con MAX / MIN / EQUAL", "MAX").toUpperCase();
			}
			var filteredFlights=[];
			if (searchOpt=="MAX") {
				var valueOpt = prompt("precio máximo", 0);
				var filteredFlights = flights.filter(function (fl) {
					return (fl.cost<=valueOpt);
				});
				filteredFlights.forEach(function(element) {
					if (element.scale==false) {
						console.log(element.id + " // El vuelo con origen " + element.from + " y destino " + element.to + " tiene un coste de " + element.cost + "€ y no realiza ninguna escala.");
					}
					else {
						console.log(element.id + " // El vuelo con origen " + element.from + " y destino " + element.to + " tiene un coste de " + element.cost + "€ y realiza escalas.");
					}
				});
			}
			else if (searchOpt=="MIN") {
				var valueOpt = prompt("precio mínimo", 0);
				var filteredFlights = flights.filter(function (fl) {
					return (fl.cost>=valueOpt);
				});
				filteredFlights.forEach(function(element) {
					if (element.scale==false) {
						console.log(element.id + " // El vuelo con origen " + element.from + " y destino " + element.to + " tiene un coste de " + element.cost + "€ y no realiza ninguna escala.");
					}
					else {
						console.log(element.id + " // El vuelo con origen " + element.from + " y destino " + element.to + " tiene un coste de " + element.cost + "€ y realiza escalas.");
					}
				});
			}
			else {
				var valueOpt = prompt("precio exacto", 0);
				var filteredFlights = flights.filter(function (fl) {
					return (fl.cost==valueOpt);
				});
				filteredFlights.forEach(function(element) {
					if (element.scale==false) {
						console.log(element.id + " // El vuelo con origen " + element.from + " y destino " + element.to + " tiene un coste de " + element.cost + "€ y no realiza ninguna escala.");
					}
					else {
						console.log(element.id + " // El vuelo con origen " + element.from + " y destino " + element.to + " tiene un coste de " + element.cost + "€ y realiza escalas.");
					}
				});
			}
		}
		else if (userOptions=="BUY") {
			console.log("comprar");
			var idToBuy = prompt("cual vuelo comprar", 0);
			var filteredFlights = flights.filter(function (fl) {
				return (fl.id==idToBuy);
			});
			filteredFlights.forEach(function(element) {
				if (element.scale==false) {
					console.log("Ha comprado el vuelo " + element.id + " // El vuelo con origen " + element.from + " y destino " + element.to + " tiene un coste de " + element.cost + "€ y no realiza ninguna escala.");
				}
				else {
					console.log("Ha comprado el vuelo " + element.id + " // El vuelo con origen " + element.from + " y destino " + element.to + " tiene un coste de " + element.cost + "€ y realiza escalas.");
				}
			});
			console.log("Gracias por su compra. ¡Hasta la próxima!");
			userOptions="EXIT";
		}	
		else if (userOptions=="EXIT") {
			console.log("Desconectado del sistema. ¡Hasta la próxima!");
		}
	}
}

// --------------------------------------------------------------------------

// SKYLAB AIRLINES! 1.0 Standard Version

// This is a example of array of objects... each position of array contains one object...
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
]
// console.log(flights[0].to) //output: New York

// Se preguntará por el nombre de usuario y dará la bienvenida.

var username = prompt("Bienvenido a Skylab Airlines. ¿Cómo te llamas?", "John Doe");

function welcome() {
	console.log("Hola de nuevo, " + username + ". Estos son nuestros vuelos para hoy:");
	
	// El usuario visualizará todos los vuelos disponibles de una forma amigable
	// El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
	var scaleCount = 0;
	flights.forEach(function(element) {
		if (element.scale==false) {
			console.log("El vuelo con origen " + element.from + " y destino " + element.to + " tiene un coste de " + element.cost + "€ y no realiza ninguna escala.");
		}
		else {
			scaleCount++
			console.log("El vuelo con origen " + element.from + " y destino " + element.to + " tiene un coste de " + element.cost + "€ y realiza escalas.");
		}
	});

	// A continuación, el usuario verá el coste medio de los vuelos.
	var total = 0;
	flights.forEach(function(element) {
		total += element.cost;
	});
	averageCost = total/flights.length;
	console.log("El coste medio de los vuelos es de " + averageCost + "€.");

	// También podrá ver cuantos vuelos efectúan escalas.

	console.log("En total, " + scaleCount + " vuelos realizan escalas.");

	// Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.

	var output = "Los 5 últimos vuelos previstos para hoy tienen destino a ";
	for (var i = flights.length-5; i < flights.length; i++) {
		output += flights[i].to + ", ";
	}
	console.log(output.slice(0, -2)+".");
}

welcome();