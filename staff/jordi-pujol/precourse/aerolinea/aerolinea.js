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
let totalCost = 0;
let contarEscalas = 0;
let ultimosDestinos =[];
let buscarValor = "";
let compararCoste = 0
let resultadoBusqueda = "";
let compararValor="";
let count = 0;
let idBorrar = 0;
let numbers = "0123456789"
let validation = 0;
let buscarID =0;


// Usuario
let user = prompt("Introduzca su nombre de usuario");
console.log("Bienvenido " + user);


//Funcion para mostrar toda la informacion de los vuelos
const infoVuelos = function(){
  for (let i = 0; i<flights.length; i++){
    if (flights[i].scale === true){
	    console.log("El vuelo con origen " + flights[i].from + " y destino " + flights[i].to + " tiene un coste de " + flights[i].cost + "€ y realizara escala.")
    }
    else {
      console.log("El vuelo con origen " + flights[i].from + " y destino " + flights[i].to + " tiene un coste de " + flights[i].cost + "€ y no realiza ninguna escala.")
    }
  }
}


// Funcion para calcular coste medio de los vuelos
const costeMedio = function(){
  flights.forEach(function(obj){
	  totalCost += obj.cost
  })
  let averageCost = totalCost/ flights.length
  console.log("El coste medio de los vuelos es de " + Math.round(averageCost) + "€")
}


// Funcion para contar cuantos vuelos efectuan escala
const vuelosEscala = function(){
  for (let i = 0; i<flights.length; i++){
    if (flights[i].scale === true){
     contarEscalas ++
    }
  }
  console.log("Un total de " + contarEscalas + " vuelos efectuan escala.");
}


// Funcion para mostrar ultimos 5 destinos
const ultimos5 = function(){
  for (let i = flights.length - 5; i<flights.length; i++){
    ultimosDestinos[i-6] = flights[i].to
  }
  console.log("Los ultimos destinos son " + ultimosDestinos.join(","));
}


// Funcion que compruebe que sean numeros
const validateNumbers = function (num){
    for (let i = 0; i<num.length; i++){
      for (let j = 0; j<numbers.length; j++){
        if(num[i] === numbers[j]){
           validation ++
              break;
        }
      }
    }
  }


// Funcion para crear un vuelo nuevo
const crearVuelo = function(){
    if(flights.length === 14){
        console.log("Ya ha alcanzado el numero maximo de vuelos, 15. Elimine uno antes de introducir otro nuevo.")
    }
    else{
		flights.push({id: 1, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false})
        for (prop in flights[flights.length-1]){
            if(prop==="id"){
                flights[flights.length-1][prop] = flights.length-1
            }
            else if(prop==="scale"){
                flights[flights.length-1][prop] = confirm('Haz click a "aceptar" si el vuelo realizara alguna escala')
            }
            else{
                flights[flights.length-1][prop] = prompt("Introduzca " + prop)
				if (prop === "cost"){
                    validateNumbers(flights[flights.length-1][prop])
                    if (validation !== flights[flights.length-1][prop].length){
                        console.log('Has introducido un caracter no valido en "cost". Por favor, introduce un numero para crear un vuelo.')
                    }
            }
        }   
    }
	if (validation !== flights[flights.length-1].cost.length){
        flights.pop()
    }
	else{
        flights[flights.length-1].cost =parseInt(flights[flights.length-1].cost)
         }
	}
}


// Funcion para borrar un vuelo
const borrarVuelo = function(){
    idVueloBorrar = prompt("introduce el ID del vuelo que desea borrar");
	for (let i =0; i< flights.length; i++){
		if (idVueloBorrar === flights[i].id.toString()){
			buscarID ++
		    flights.splice(idVueloBorrar,1);
			for (let j=i;j<flights.length-i;j++){
				flights[j].id --
			}
		}
    }
    if (buscarID === 0){
		console.log("El ID que ha introducido no exite. Vuelva a probar.")
	}
}


// Funcion para los ADMINS
const admin = function(){
    if (confirm("Quieres crear un vuelo?")){
        crearVuelo();
    }
    else if (confirm("Quieres eliminar un vuelo?")){
        borrarVuelo();
    }
}

    
// Funcion para los USERS
const usuario = function(){
    if (confirm("Si quiere buscar un vuelo, seleccione aceptar")){
        buscarValor = prompt('Introduzca un precio. A continuacion podra escoger si visualizar los vuelos con un precio superior, inferior o igual a su valor.')
        validateNumbers(buscarValor);
        if (validation !== buscarValor.toString().length){
            console.log("Has introducido un caracter no valido. Por favor, introduce un numero.")
        }
        else {
            compararValor = prompt('Ahora introduzca la palabra "superior", "inferior" o "igual"')
            if (compararValor === "superior" || compararValor === "Superior" || compararValor==="SUPERIOR"){
                for (let i =0; i<flights.length; i++){
                    if (flights[i].cost > buscarValor){
                        console.log(flights[i])
                        count ++
                    }   
                }
                if (count === 0){
                    console.log("No hemos encontrado ningun resultado")
                }
            }
            else if (compararValor === "inferior" || compararValor === "Inferior" || compararValor==="INFERIOR"){
                for (let i =0; i<flights.length; i++){
                    if (flights[i].cost < buscarValor){
                        console.log(flights[i])
                        count ++
                    }   
                }
                if (count === 0){
                    console.log("No hemos encontrado ningun resultado")
                }
            }
            else if (compararValor === "igual" || compararValor === "Igual" || compararValor==="IGUAL"){
                for (let i =0; i<flights.length; i++){
                    if (flights[i].cost > buscarValor){
                        console.log(flights[i])
                        count ++
                    }   
                }
                if (count === 0){
                    console.log("No hemos encontrado ningun resultado")
                }
            }
            else {
                console.log('Vuelva a intentarlo. Introduzca "superior", "inferior" o "igual".')
            }
        }
    }
}


// Funcion para comprar vuelo
const comprarVuelo = function(){
    idBorrar = prompt("Si desea comprar un vuelo introduzca su ID.")
	for (let i =0; i< flights.length; i++){
		if (idBorrar === flights[i].id.toString()){
			buscarID ++
		    console.log("Usted ha seleccionado el vuelo", flights[idBorrar], "Gracias por su compra. Vuelva pronto")
		}
    }
    if (buscarID === 0){
		console.log("El ID que ha introducido no exite. Vuelva a probar.")
	}
}


// Fucncion madre que llamara a todas las otras funciones
const vuelos = function(){
    infoVuelos();
    costeMedio();
    vuelosEscala();
    ultimos5();
    let typeUser = confirm('Si es usted administrador, seleccione "aceptar". Si es usuario seleccione "cancelar"')
    if (typeUser === true){
        admin();
    }
    else if (typeUser === false){
        usuario();
        if (count !== 0){
            comprarVuelo();
        }
    }
}

vuelos();
