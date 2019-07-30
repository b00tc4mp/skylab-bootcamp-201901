/* Después de ver toda la información el programa pedirá al usuario si es ADMIN/USER, dependiendo de la elección, el programa se comportará de la siguiente manera:

Si eres ADMIN, la función debería permitir:
- Poder crear, más vuelos, pidiendo la información por prompt(), sin poder pasar de 15 vuelos, si se intenta introducir uno más, saltará un alert().
- Poder eliminar vuelos mediante el ID.

Si eres USER la función debería permitir:
 -Buscar por precio (más alto, más bajo o igual), el usuario debería mostrar los datos de los vuelos encontrados y, indicando el ID, el programa responderá: "Gracias por su compra, vuelva pronto." */

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

function showFlights(data, typeUser, find = false) {
    if (data.length != 0) {
        let allFlights = '';
        // Podría cambiarlo para hacerlo mediante un forEach igual que en la función showScaleFlights.
        for (let i = 0; i < data.length; i++) {
            if (typeUser == 'ADMIN' || find == true) { //?!!!
                allFlights += `ID: ${data[i].id} - `;
            }
            allFlights += `El vuelo con origen: ${data[i].from}, y destino: ${data[i].to} tiene un coste de ${data[i].cost}€`;
            if (data[i].scale) {
                allFlights += ' con escala.\n'
            } else {
                allFlights += ' y no realiza ninguna escala.\n'
            }
        }
        return allFlights;
    } else {
        return 'No hay vuelos!' 
    }
}

function showAvgCost(data) {
    let sum = 0;
    data.forEach(function(flight){
        sum += flight.cost; 
    });
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

    return scaleFlights;
}

function showLastFlights(data) {
    return data.slice(-5);
}

function orderFlightId(data) {
    return data.sort((a, b) => a.id - b.id);
}

function hasScale() {
    let option = '';
    do {
        option = prompt('Tiene escalas el vuelo? y/n');
        switch(option) {
            case 'y':
                return true;
            case 'n':
                return false;
            default:
                console.log("Lo siento, seleccione sólo 'y' o 'n'");
                break;
        }
    } while(option != 'y' || option != 'n'); 
}

function getMaxId(data) {
    return data[data.length-1].id;
}

function addFlight(data) {
    if(data.length == 15) {
        //Es lo que se pide en el proyecto pero se podría quitar :)
        alert('Lo siento, máxima cantidad de vuelos alcandada.\nPruebe de eliminar 1 vuelo, gracias.');
        
        return 'Imposible añadir más vuelos, máximo alcanzado!';
    }
    data.push({
        id: getMaxId(data) + 1,
        to: addCity('Destino del vuelo?'),
        from: addCity('Procedencia del vuelo?'),
        cost: addCost(),
        scale: hasScale()
    });

    return 'Vuelo añadido!'; 
}

function addCity(msg) {
    let city = prompt(msg);
    if (city == '' || city.length < 3) {
        console.log('Por favor, introduzca una ciudad, gracias.');
        return addCity(msg);
    } else {
        return city;
    }
}

function addCost() {
    let cost = parseFloat(prompt('Precio del vuelo?')).toFixed(2) * 1;
    if (isNaN(cost)) {
        console.log('Por favor, introduzca un importe correcto, gracias.');
        return addCost();
    } else {
        return cost;
    }
}

function deleteFlight(data) {
    let id = prompt('Introduzca el Id del vuelo que quiere eliminar:');
    let index = data.findIndex(flight => flight.id == id);
    if (index != -1 && id != '') {
        data.splice(index, 1);
        return 'Vuelo eliminado!';
    } else {
        return "Lo siento, no existe ningún vuelo con ese 'id'";
    }
}

function welcome(name) {
    return `Bienvenido ${name}!`;
}

function showOptions(user) {
    let msg = '';
    
    if (user == 'ADMIN') {
        msg += 'OPCIONES ADMIN:\n';    
    } else {
        msg += 'OPCIONES:\n';
    }
    
    msg += '1. Mostrar todos los vuelos disponibles.\n';
    msg += '2. Mostrar Coste Medio de los vuelos.\n';
    msg += '3. Mostrar vuelos con escala.\n';
    msg += '4. Mostrar los últimos 5 vuelos.\n';
    
    if (user != 'ADMIN') {
        msg += '5. Buscador de vuelos.\n';
    } else {
        msg += '5. Añadir vuelos.\n';
        msg += '6. Borrar vuelos.\n';
    }
    
    msg += '0. Salir.';
    return msg;
}

function showFindOptions(num) {
    let msg = '';
    msg += `1. Precio mayor a ${num}€\n`;
    msg += `2. Precio menor a ${num}€\n`;
    msg += `3. Precio igual a ${num}€`;

    return msg;
}

function findFlights(data) {
    let arr = [];
    let importe = prompt('Indique el importe a buscar:');
    let option = prompt(showFindOptions(importe) + '\n\n' + 'Seleccione tipo de busqueda:');
    switch(option) {
        case '1':
            arr = data.filter(flight => flight.cost > importe);
            break;

        case '2':
            arr = data.filter(flight => flight.cost < importe);
            break;
        
        case '3':
            arr = data.filter(flight => flight.cost == importe);
            break;

        default:
            return 'Por favor, seleccione una opción válida.';
    }
    return arr;
}

function buyFlight(data) {
    let id = prompt('Indique el ID del vuelo que desea comprar:');
    let arr = data.filter(flight => flight.id == id);
    if (arr.length != 0) {
        return "Gracias por su compra, vuelva pronto.";
    } else {
        return "Lo siento, no existe ningún vuelo con ese 'id'";
    }
}

function adminPanel(option) {
    switch(option) {
        case '5':
            return addFlight(flights);
            break;
        
        case '6':
            return deleteFlight(flights);
            break;
        
        default:
            return 'Por favor, seleccione una opción válida.';
            break;
    }
}

function skylabAirlines(flights) {
    orderFlightId(flights);
    
    let user;
    do {
        user = prompt("Por favor, como te llamas?");
    } while (!user);
    console.log(welcome(user));

    let typeUser = prompt('Que tipo de usuario eres? user/admin').toUpperCase();

    let option;
    do {
        option = prompt(showOptions(typeUser)+ '\n\n' + 'Seleccione la opción que desea realizar: ');
        switch (option) {
            case '1':
                console.log(showFlights(flights, typeUser));
                break;
            
            case '2':
                console.log(showAvgCost(flights));
                break;
    
            case '3':
                console.log(showFlights(showScaleFlights(flights), typeUser));
                break;
    
            case '4':
                console.log(showFlights(showLastFlights(flights), typeUser));
                break;
            
            case '5':
                if (typeUser == 'ADMIN') {
                    console.log(adminPanel(option));
                } else {
                    let foundFlights = findFlights(flights);
                    console.log(showFlights(foundFlights, typeUser, true));
                    if (foundFlights.length != 0) {
                        console.log(buyFlight(foundFlights));
                    }
                }
                break;

            case '0':
                break;
            
            default:
                if (typeUser == 'ADMIN') {
                    console.log(adminPanel(option));
                } else {
                    console.log('Por favor, seleccione una opción válida.');
                }
                break;
        }   
    } while (option != 0)

    return 'Gracias por utilizar nuestro servicio, hasta otra!';
}

skylabAirlines(flights);

//Deberías controlar que el usuario introduzca un número al añadir un vuelo y determinar su coste. 
//En este caso, igual que en la versión básica, también te recomiendo que separes las funciones y las dejes independientes de la principal. 