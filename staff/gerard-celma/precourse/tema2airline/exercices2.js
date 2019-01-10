// // STRINGS


// // a) Puedes contar cuantas letras tiene tu nombre?

// var myName = "Gerard";

// console.log("My name has " + myName.length + " letters.");

// // b) Añade tu apellido e indica en que posición del string empieza (prueba a buscar el espacio entre el nombre y el apellido)

// var myName = "Gerard Celma";

// console.log("Your last name starts on position " + (myName.indexOf(" ") + 1));

// // c) Ahora, con tu apellido y nombre en la misma variable, muestra solo el nombre (lo que haya antes del espacio):

// console.log("My name is " + myName.slice(0,7));

// // d) Ahora, solo tu apellido.

// console.log("My surname is " + myName.slice(7));

// // d1) Iguala el resultado a una variable nueva e imprímela por pantalla.

// var mySurname = myName.slice(7);

// console.log(myName + ", " + mySurname);

// // e) Ahora, reemplaza tu nombre por "Mr/Ms" y vuelve a mostrar la variable con los cambios.

// var newString = myName.replace("Gerard","Mr.");

// console.log("Hello " + newString);

// // f) Selecciona tu apellido y transfórmalo a MAYÚSCULAS.

// console.log("My surname is " + mySurname.toUpperCase());

// // g) Ahora declara una variable nueva e igualala a la anterior variable sumándole, además, un mensaje.

// var newName = myName + " is the fucking maister."

// console.log(newName);

// // h) Ahora, puedes seleccionar la inicial de tu nombre y apellido y mostrarlas por pantalla?

// console.log(myName.slice(0,1) + "." + myName.slice(7,8));



// // ARRAYS

// // a) Declara tu nombre completo en una array y muéstralo por pantalla separando cada letra por "/"

// var myName = ["G","E","R","A","R","D","C","E","L","M","A"];

// console.log(myName.join("/"));

// // b) Ahora solo selecciona tu apellido y muestra cada letra separada por "|"

// var surName = myName.slice(6);

// console.log(surName.join("|"));

// // c) Ahora muestra cada letra de tu nombre con su posición (necesitarás un bucle for)

// var result = [];

// for (var i=1; i<7; i++) {
//     result.push(i+ "º " +myName[i-1]);
// }

// console.log(result.join(", "));

// // d)Como en el ejercicio anterior, pero seleccionando tu apellido

// var result = [];

// for (var i=1; i<surName.length + 1; i++) {
//     result.push(i+ "º " +surName[i-1]);
// }

// console.log(result.join(", "));

// // e) Puedes indicarme las iniciales de tu nombre y apellido? Como en el ejercicio h de la sección de strings

// console.log(myName[0]+ "." +myName[6]);

// // f) Ahora, reformula la array, introduciendo tu nombre en primera posición, tu apellido en segunda, y además añade en otra posicion tu edad. Muestra por pantalla solo tu nombre y tu edad en un solo mensaje.

// myName = ["Gerard","Celma",34];

// console.log("My name is " +myName[0]+ " and i'm " +myName[2]+ " years old.")

// // g) Prepara una función para añadir tu City a la array, muestra un mensaje mostrando el contenido de toda la array, así aseguraremos los cambios.

// function myCityAdd() {
//     myName.push("Barcelona");
//     return "City added to array! => " +myName.join();
// }

// console.log(myCityAdd());

// // h) Crea ahora, una funcion para eliminar la variable City y asegura los cambios.

// function myCityDelete() {
//     myName.pop();
//     return "City deleted! => " +myName.join();
// }

// console.log(myCityDelete());

// // j) Ahora, elimina el nombre y asegura los cambios

// function myNameDelete() {
//     myName.shift();
//     return "Name deleted! => " +myName.join();
// }

// console.log(myNameDelete());

// // k) Quiero volver a introducir mi nombre pero si lo introduzco utilizando push() estará en la última posición, como podria hacer para introducirlo en la primera posición?

// function addName() {
//     myName.unshift("Gerard");
//     return "Name added again! => " +myName.join();
// }

// console.log(addName());

// // l) Ahora, declara una array con los números del 0 a 10 y muestra cada número multiplicado por dos.

// var numbers = [0,1,2,3,4,5,6,7,8,9,10];

// var multByTwo = numbers.map(function(e) {
//     return e * 2;
// });

// console.log(multByTwo);

// // l1) Reformula la función para que puedas especificar por cual número debería multiplicar cada elemento de la array.

// var multi = 3;

// function multiArray(num) {
//     var multByTwo = numbers.map(function(e) {
//         return e * num;
//     });
//     console.log(multByTwo);
// }

// multiArray(multi);

// // m) Podrías mostrarlos en el orden inverso?

// function changeOrder() {
//     numbers.sort(function(a,b) {
//         return b-a;
//     });
//     console.log(numbers);
// }

// changeOrder();

// // n) Puedes indicarme que letras se repiten de tu nombre y cuantas veces?
// // n1) Ahora muestra por consola que letras NO se repiten y muestra tu nombre sin esas letras

// var myName = ["G","E","R","A","R","D","C","E","L","M","A"];

// var result3 = [];
// var result4 = [];

// function repeatLetters2(name) {
//     for (var i=0; i<name.length; i++) {
//         counter = 0;
//         for (var j = i + 1; j<name.length; j++) {
//             if(name[i] === name[j]) {
//                 counter++;
//                 name.splice(j,1);
//                 result3.push(counter + 1);
//                 result3.push(name[i]);
//             }
//         }
//         if(counter === 0) {
//             result4.push(name[i]);
//         }
//     }
//     for (var i=0; i<result3.length; i = i+2) {
//         console.log("The letter " +result3[i+1]+ " is repeated " +result3[i]+ " times.")
//     }
//     console.log("The letters " + result4.join(", ") + " are not repeated. The name is " +result4.join(""))
// }

// repeatLetters2(myName);



// NUMBERS

// a) Que hora es? Declara la hora como número y devuelvela como String

// function addZero(i) {
//     if (i < 10) {
//         i = "0" + i;
//     }
//     return i;
// }

// function whatsTheTime() {
//     var d = new Date();
//     var h = addZero(d.getHours());
//     var m = addZero(d.getMinutes());
//     var s = addZero(d.getSeconds());
//     var hour =  h + ":" + m + ":" + s;
//     return hour;
// }

// console.log(whatsTheTime().toString());

// var hour = 11.06;

// function convertNumber(number) {
//     return number.toString();
// }

// console.log("It's " + convertNumber(hour)+ " in the morning.");

// // b) Nono, que hora exactamente? Dime la hora sin minutos!
// // c) Ahora, declara tu hora y muéstrala redondeada.

// function roundNumber(number) {
//     return Math.round(number);
// }

// console.log("It's " + roundNumber(hour)+ " is the morning.");

// // d) Hagamos una calculadora. Primero, la suma. Crea variables con valores distintos y súmalos.
// // d1) Añade la resta...
// // d2) La multiplicación...
// // d3) Y, por ultimo, la división.

// var a = 4;
// var b = 2;

// function calculator(number1,number2) {
//     return "The sum, rest, mult and div of " +number1+ " and " +number2+ " is: " +(number1 + number2)+ ", " +(number1 - number2)+ ", " +(number1*number2)+ " and " +(number1/number2);
// }

// console.log(calculator(a,b));

// // d4) Ahora, intenta multiplicar un número por una string, que devuelve?

// console.log(10*"hour");

// // e) Podemos controlar este error con un condicional if?

// function mult(number1,number2) {
//     if(isNaN(number1) || isNaN(number2)) {
//         console.log("You can't do this operation!");
//     }
// }

// mult(1,"hour");

