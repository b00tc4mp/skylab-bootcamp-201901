function airline() {
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
        { id: 010, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
    ];
    function askName() {
        var nombre = prompt('Como se llama?');
        return 'Hola ' + nombre + '!.';
    };

    console.log(askName());

    function vuelos() {
        for (let i = 0; i < flights.length; i++) {
            if (flights[i].scale === false) {
                console.log(`El vuelo con origen: ${flights[i].from}, y destino: ${flights[i].to} tiene un coste de ${flights[i].cost} y no realiza ninguna escala.`);
            } else {
                console.log(`El vuelo con origen: ${flights[i].from}, y destino: ${flights[i].to} tiene un coste de ${flights[i].cost} y realiza escala.`)
            };
        };
    };

    console.log(vuelos());

    function avg() {
        sum = 0;
        for (let i=0; i < flights.length; i++) {
            sum += flights[i].cost;
        
        };
        
        return sum;
    
    };

    function div() {
        return avg() / flights.length;
    }

    console.log(`La media de precio de los vuelos es ${div()}`);

    console.log('Vuelos que realizan escala:');
    
    function escala() {
        for(let i = 0; i < flights.length; i++) {
            if (flights[i].scale === true) {
                console.log(`${flights[i].from} - ${flights[i].to}`);
            } else {
                console.log();
            };
        };
    };

    console.log(escala());

    console.log('Los últimos cinco vuelos son hacia:')

    function lastFive() {
        for(let i = 6; i < flights.length; i++) {
            console.log(flights[i].to);
        };
    };

    console.log(lastFive());

};

console.log(airline());