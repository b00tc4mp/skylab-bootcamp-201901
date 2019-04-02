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

function skylabAirlines () {
    let user = prompt('Welcome to Skylab Airlines, please enter your user name');
    if(!user){
        alert('Hasta luego');
    } else {
        alert(`Hello ${user}, Welcome to Skylab Airlines`);
        for (let i = 0; i < flights.length; i++ ){
            flights[i].scale ?
            alert(`El vuelo con origen: ${flights[i].from}, y destino: ${flights[i].to} tiene un coste de ${flights[i].cost}€ con escalas.`):
            alert(`El vuelo con origen: ${flights[i].from}, y destino: ${flights[i].to} tiene un coste de ${flights[i].cost}€ y no realiza ninguna escala.`);
        };
        var costArr = [];
        for (let i = 0; i < flights.length; i++ ){
            costArr.push(flights[i].cost);
        };
        //console.log(costArr);
        var sum = 0;
        for (let i = 0; i < costArr.length; i++){
            sum += costArr[i];
        };
        //console.log(sum);
        var avg = sum/costArr.length;
        alert(`El costo promedio de los vuelos es de ${Math.round(avg*100)/100}€`);
        var counter = 0;
        for (let i = 0; i < flights.length; i++){
            if(flights[i].scale)
            counter++;
        };
        if (!counter){
            alert('Los vuelos no realizan escalas');
        } else if (counter === 1){
            alert(`Hay un vuelo con escalas`);
        } else {
            alert(`Hay ${counter} vuelos con escalas`);
        };
        alert(`Los últimos 5 vuelos del día tienen los siguientes destinos:`);
        for (let i = flights.length - 5; i < flights.length; i++){
            alert(flights[i].to);
        };
        alert('Hasta luego');
    }
};

skylabAirlines();
