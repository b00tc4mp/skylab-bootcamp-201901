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

function Bienvenida(){
    var name = prompt("Dime tu nombre de usuario");
    console.log ('Bienvenido/a ' + name);//console
}

function Visualizar(){
    var siOnoEscala;

    for(var i = 0; i<flights.length; i++){
        if(flights[i].scale==false){
            siOnoEscala='no realiza ninguna escala';
        }else{
            siOnoEscala='realiza alguna escala';
        }
        console.log ('El vuelo con origen ' + flights[i].to + ' y destino ' + flights[i].from + ' tiene un coste de ' + flights[i].cost + ' €' + ' y ' + siOnoEscala);
    }
}

function elCosteMedio(){
    var costesVuelos = [];
    var sumaCostes = 0;
    var PromedioVuelos = 0;

    for(var i = 0; i<flights.length; i++){
        costesVuelos.push(flights[i].cost);
    }
    for(var i = 0 ; i<costesVuelos.length; i++){
        sumaCostes = sumaCostes + costesVuelos[i];
    }
    PromedioVuelos = sumaCostes / costesVuelos.length;
    console.log('El coste medio de los vuelos es de ' + PromedioVuelos.toFixed(3) + ' €');
}

function ScalasVuelos(){
    var escalados = [];
    for(var i = 0; i<flights.length; i++){
       if(flights[i].scale==true){
        escalados.push(flights[i]);
       }
    }
    console.log('La cantidad de vuelos que hacen escala son ' + escalados.length);
}

function UltimosVuelos(){
    var lastFLights = []
    for(var i = 0; i<flights.length; i++){
        lastFLights.push(flights[i].to);
    }
    console.log('Los destinos de los ultimos vuelos del dia son ' + lastFLights.slice(lastFLights.length-5, lastFLights.length));
}

function Ejecutar(){
    
    return Bienvenida() + Visualizar() + elCosteMedio() + ScalasVuelos() + UltimosVuelos();
}

Ejecutar();