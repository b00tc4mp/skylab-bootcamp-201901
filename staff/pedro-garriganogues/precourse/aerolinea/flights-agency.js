var flights = [
 { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
 { id: 01, to: 'New_York', from: 'Barcelona', cost: 700, scale: false },
 { id: 02, to: 'Los_Angeles', from: 'Madrid', cost: 1100, scale: true },
 { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
 { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
 { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },
 { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
 { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
 { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
 { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
 { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];



var viajes = [''];
var viajes1 = [''];
var precio = [''];


for (var i = 0; i<11;i++){
var viaje = flights[i].to
viajes=viajes+ ' ' +viaje
}{
viaje = ''
};

for (var i = 0; i<11;i++){
var viaje1 = flights[i].from
viajes1=viajes1+ ' ' +viaje1
}{
viaje1 = ''
};

for (var i = 0; i<11;i++){
var coste = flights[i].cost
precio=precio+ ' ' +coste
}{
viaje2 = ''
};
var precio1 = precio.split(" ");
var viajesA=viajes.split(" ");
var viajes1A=viajes1.split(" ");

var escalas=[''];

for (var i=0; i<11;i++){
var escala = flights[i].scale
if(escala === true){
var escala1 =  'si'
}else{
var escala2 = 'no'
}
escalas=escalas + " " + escala1 + escala2
escala1 = ''
escala2 = ''
};
var escalas1 = escalas.split(" ")
var costeMedio = (flights[0].cost + flights[1].cost + flights[2].cost + flights[3].cost + flights[4].cost + flights[5].cost + flights[6].cost + flights[7].cost + flights[8].cost + flights[9].cost + flights[10].cost)/11
var person = prompt("Please enter your name", "Customer");

for (var i=0; i<11;i++){
var escalasTotales = flights[i].scale
if(flights[i].scale === true){
var conEscalaCounter =  'Positive'
var escalaCounter1 = conEscalaCounter + escalaCounter1

conEscalaCounter1= ''
}
};


var escalaCounterFinal = escalaCounter1.split('Positive').length-1
var destinos = [''];
var precio = [''];


for (var i = 6; i<11;i++){
var destinoFinal = flights[i].to
destinos=destinos+ ' ' +destinoFinal
}{
destinoFinal = ''
};

for(var i = 0; i < 12; i++){
if(i===0){
console.log('Bienvenido ' + person + ' estas son tus opciones de vuelo:' );
}else{
console.log('El vuelo con origen ' + viajes1A[i] + ' y destino ' + viajesA[i] + ' tiene un coste de ' + precio1[i]  + '€' + ' y ' + escalas1[i] + ' realiza escalas.');

}
};
console.log('El coste medio de un vuelo son ' + costeMedio.toFixed(2) + ' y solo ' + escalaCounterFinal + ' de estos realizan escalas.')
console.log('Finalmente estos son los últimos vuelos del día: ' + destinos + '!')


escalaCounterFinal = ''
escalaCounter1 = ''