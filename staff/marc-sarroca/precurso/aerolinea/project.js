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

var costSum = 0
var count = 0
var count2 = 0
var count3 = count - 5
var person = prompt("Inserta tu nombre de usuario");

if (person != null) {
 console.log("Bienvenido " + person)
 console.log('---------------------------------------')


flights.forEach(function(obj){
	count ++
	costSum += obj.cost
	if (obj.scale === true){
	console.log('El vuelo ' + obj.from + ' => ' + obj.to + ' tiene un coste de: ' + obj.cost + '$' + ' con una escala')	
	}
	
	else {
		console.log('El vuelo ' + obj.from + ' => ' + obj.to + ' tiene un coste de: ' + obj.cost + '$' + ' sin escalas')
	}
	

})
console.log('---------------------------------------')
console.log('El coste medio es ' + costSum / count + '$')
console.log('---------------------------------------')
console.log('Estos son los vuelos con escalas:')


flights.forEach(function(obj2){
if (obj2.scale === true){
	count2 ++
	console.log('El vuelo ' + obj2.from + ' => ' + obj2.to + ' tiene un coste de: ' + obj2.cost + '$' + ' con una escala')
}

})
console.log('Hay ' + count2 + ' vuelos con escalas')
console.log('---------------------------------------')
console.log('Estos son los ultimos 5 vuelos del dia:')

var flights2 = flights.splice(count3,(flights.length));
flights2.forEach(function(obj3){
	console.log('El vuelo ' + obj3.from + ' => ' + obj3.to + ' tiene un coste de: ' + obj3.cost + '$' + ' con una escala')

})

console.log('---------------------------------------')

}

