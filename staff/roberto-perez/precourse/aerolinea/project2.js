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


//Mensajes de Bienvenida
const welcomeUser = function(username) {

  console.log(`Bienvenido ${username} :)`);
  console.log('\n');
  console.log(`Listado de vuelos actuales:`);
  let totalCost = 0;
  let scale = 0;
  let noScale = 0;
  for(flight of flights) {
    let txtScale = (flight.scale) ? 'realizara alguna escala' : 'no realiza ninguna escala'

    console.log(`- El vuelo con origen: ${flight.from}, y destino: ${flight.to} tiene un coste de ${flight.cost}€ y ${txtScale}.`);
    totalCost += flight.cost;
    if(flight.scale){
      scale++;
    }else{
      noScale++;
    }
  }
  console.log('\n');
  console.log(`El coste medio de los vuelos es de ${Math.round(totalCost/flights.length * 100)/100}€.`);
  console.log('\n');
  console.log(`${scale} vuelos efectuarán alguna escala.`);
  console.log('\n');
  console.log('Los destinos de los últimos 5 vuelos son:');
  flights.slice(6).forEach(flight => console.log(`- ${flight.to}`));
}


//Crear vuelo
const createFlight = function() {
  if(flightsCreated >= CREATE_MAX_FLIGHT) {
    alert('Has llegado al límite de vuelos que puedes crear.');
    return false;
  }
  let to = prompt('Destino?');
  let from = prompt('Origen?');
  let cost = prompt('Coste?');
  let scale = prompt('Hace escala? si/no');
  flights.push({
    id: flights.length,
    to: to,
    from: from,
    cost: (parseFloat(cost)) ? parseFloat(cost) : 0,
    scale: (scale === 'si') ? true : false
  });
  console.log(flights);
  console.log("Vuelo creado!");
  flightsCreated++;
  return true;
}


//Eliminar vuelo
const deleteFlight = function() {
  console.log('Aquí tienes el listado actual de vuelos:');
  console.log(flights);
  let id = prompt('ID del vuelo?');
  let vueloIndex = flights.findIndex(x => x.id === parseInt(id));
  if(vueloIndex !== -1){
    flights.splice(vueloIndex,1);
    console.log('Vuelo eliminado!');
  }else{
    console.log('No existe ningún vuelo con ese ID');
  }
  console.log(flights);
}

const showFlights = function(flights) {
  for(flight of flights) {
    let txtScale = (flight.scale) ? 'realizara alguna escala' : 'no realiza ninguna escala'
    console.log(`- El vuelo con origen: ${flight.from}, y destino: ${flight.to} tiene un coste de ${flight.cost}€ y ${txtScale}.`);
  }
}

//Buscar por precio
const searchByCost = function(cost) {
  let lessCost = flights.filter(x => x.cost < cost);
  let equalCost = flights.filter(x => x.cost === cost);
  let moreCost = flights.filter(x => x.cost > cost);

  if(lessCost.length > 0) {
    console.log(`Listado de vuelos con un coste inferior a ${cost}€`);
    console.log(showFlights(lessCost));
    console.log('\n');
  } else {
    console.log(`No existen vuelos con un coste inferior a ${cost}€`);
    console.log('\n');
  }
  if(moreCost.length > 0) {
    console.log(`Listado de vuelos con un coste superior a ${cost}€`);
    console.log(showFlights(moreCost));
    console.log('\n');
  } else {
    console.log(`No existen vuelos con un coste superior a ${cost}€`);
    console.log('\n');
  }
  if(equalCost.length > 0) {
    console.log(`Listado de vuelos con un coste igual a ${cost}€`);
    console.log(showFlights(equalCost));
    console.log('\n');
  } else {
    console.log(`No existen vuelos con un coste igual a ${cost}€`);
    console.log('\n');
  }

  buyFlight();
}


//Comprar vuelo
const buyFlight = function() {
  let id = prompt('Indica el ID del vuelo que desea comprar?');
  let vueloIndex = flights.findIndex(x => x.id === parseInt(id));
  if(vueloIndex !== -1){
    console.log('Gracias por su compra, vuelva pronto.');
  }else{
    console.log('No existe ningún vuelo con ese ID');
    let continueBuy = prompt('Desea indicar un nuevo ID? si/no');
    if(continueBuy === 'si'){
      buyFlight();
    }else{
        console.log('Gracias por confiar en nosotros, vuelva pronto.');
    }
  }
}


let username = prompt('Nombre de usuario:');

welcomeUser(username);

let role = prompt('Qué tipo de usuario eres? ADMIN/USER');

let flightsCreated = 0;

const CREATE_MAX_FLIGHT = 15;

switch(role.toLowerCase()) {
  case 'admin':
    let preguntar = true;
    do {
      let action = prompt('Desea crear o eliminar vuelos? CREAR/ELIMINAR/SALIR');
      if(action.toLowerCase() === 'crear') {
        if(!createFlight()) {
          let exit = prompt('Desea salir del programa? si/no');
          if(exit === 'si') {
            preguntar = false;
          }
        }
      }else if(action.toLowerCase() === 'eliminar') {
        deleteFlight();
      }else{
        preguntar = false;
      }
    }while(preguntar);

    console.log('\n');
    console.log('Esperamos que vuelvas pronto!');

  break;
  case 'user':
    let cost = prompt('Filtrar vuelos por coste igual a:');
    searchByCost(cost);
  break;
  default:
    console.log('Error')
  break;
}
