// // a) Primero, creamos una función que nos cree un saludo, pasa tu nombre como parámetro y devuélvelo por la consola.

// function salute (name) {
//     console.log("Hi " +name);
// }

// salute("Gerard");

// // b) Intenta retornar los valores en lugar de usar console.log

// function salute2 (name) {
//     return ("Hi " +name);
// }

// console.log(salute2("Gerard"));

// // c) Ahora, añade tu edad y concaténala al return

// function salute3 (name,age) {
//     var myMessage = "Hello " +name+ ", you're " +age+ " years old.";
//     return myMessage;
// }

// console.log(salute3("Gerard",34));

// // d) Iguala tu función a una variable y ejecútala

// function salute4 (name,age) {
//     console.log("Hello " +name+ ", you're " +age+ " years old.");
// }

// var showData = salute4("Gerard",34);

// showData();

// // e & f) Ahora declara otra funcion que devuelva tu edad y asigna su resultado a otra variable, intenta imprimir sus dos resultados concatenados.

// function myName(name) {
//     console.log(name);
// }

// function myAge(age) {
//     console.log(age);
// }

// var gerard = myName("Gerard") + myAge(34);

// gerard();

// // g) Intenta englobar todas las funciones en una sola funcion padre, el return de dicha función padre deberá ser la llamada a las funciones hijas

// function myName2(name) {
//     return name;
// }

// function myAge2(age) {
//     return age;
// }


// function goodFather(param1,param2) {
//     var a = myName2(param1);
//     var b = myAge2(param2);

//     return a + b;
// }

// console.log(goodFather("Gerard",34));

// h & i & j) Haz otra función hija que solo devuelva un número random, ese número random será el argumento que se pasará como parámetro a la función age()

function genNumber() {
    var x = Math.floor((Math.random() * 100) + 1);
    return x;
}


function myName2(name) {
    return (name+ "... aka IRONMAN ");
}

function myAge2(age) {
    return (age)+ "...sure you're Tony Stark?";
}


function goodFather(param1) {
    var a = myName2(param1);
    var b = myAge2(genNumber());

    return a + b;
}

console.log(goodFather("Gerard"));

// k) Modifica la primera función y la función padre para, si el parámetro introducido no es tu nombre, no siga con la segunda llamada

function genNumber() {
    var x = Math.floor((Math.random() * 100) + 1);
    return x;
}


function myName2(name) {
    return name;
}

function myAge2(age) {
    return age;
}


function goodFather(param1) {
    var a = myName2(param1);

    if(a !== "Gerard") {
        return "The first function returns: " + a + "... You're not IRONMAN!";
    } else {
        var b = myAge2(genNumber());

    return a + b;
    }
}

console.log(goodFather("Gerard"));

