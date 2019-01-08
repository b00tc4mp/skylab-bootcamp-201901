// a) Declara tu nombre y muéstralo por consola:

var name = "Gerard";
console.log(name);

// b) Declara tu edad y muéstralo por consola:

var age = 34;
console.log(age);

// c) Declara tu nombre, tu apellido y tu edad en un array en diferentes posiciones y muéstrala por consola:

var info = ["Gerard", "Celma", 34];
console.log(info);

// d) Declara tu nombre y tu edad dentro de un objeto y muéstralo por consola:

var data = {name: "Gerard", age: 34};
console.log(data);

// e) Ahora utiliza el array que has creado anteriormente para recorrerlo y mostrar una a una todas las posiciones del array.

for (var i=0; i<info.length; i++) {
    console.log(info[i]);
}

// f) Crea una estructura condicional que imprima el número mayor entre dos números.

var a = 25;
var b = 12;

if(a>b) {
    console.log(a);
}else {
    console.log(b);
}

// f1) Crea otra condicion else if para contemplar la posibilidad de que los dos números sean iguales:

var a = 25;
var b = 25;

if(a>b) {
    console.log(a);
}else if(a == b) {
    console.log("Los dos numeros son iguales");
}else {
    console.log(b);
}

// g) Recorre un array de 5 números y cuando llegues a la mitad muestra el siguiente mensaje: 'We are in the middle of loop'.

var numbers = [1,2,3,4,5];

for (var i=0; i<numbers.length; i++) {
    if (i == 2) {
        console.log("We are in the middle of the loop");
    }
}

// g1) Declara tu nombre y tu edad en dos variables y crea un condicional para, en caso de no coincidir con tus datos, mostrar un error.

var myName = "Gerard";
var myAge = 34;

if (myName != "Gerard" && myAge != 34) {
    console.log("This is not you!")
} else {
    console.log("Hi! Glad to see you again.");
}

// h) Declara tu nombre y DNI en dos variables y crea un condicional para, en caso de que coincida uno de los dos datos, muestre un mensaje.

myName = "Gerard";
myID = 46347518;

if (myName == "Gerard" || myID == 46347518){
    console.log("Permision granted");
} else {
    console.log("Try again");
}

// i) Crea un array, introduce los datos anteriores y unos cuantos más de forma que al recorrer el array muestre un mensaje cuando encuentre tus datos.

var data = ["Pepe", 23, "Raul", 32, "Gerard", 34];

for (var i=0; i<data.length; i++) {
    if(data[i] == "Gerard") {
        console.log("Your name " + data[i] + " was found in position " +i);
    } else if (data[i] == 34) {
        console.log("Your age " + data[i] + " was found in position " +i);
    }
}

// j) Crea un array de strings y recorre cada una de esos valores. Imprime cada caracter en una línea distinta.

var data = ["green", "yellow", "red", "orange", "blue"];

for (var i=0; i<data.length; i++) {
    for (var j=0; j<data[i].length; j++) {
        console.log(data[i][j]);
    }
    console.log("");
}