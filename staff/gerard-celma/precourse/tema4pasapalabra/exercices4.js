// // a) Escribe una funcion en la que, declarando una array con los numeros del 1 al 9, muestres por pantalla los numeros unidos por parejas (1-2, 2-3, 3-4...), además, cada elemento de la pareja deberá estar multiplicada por 2.

// function newArray() {
//     var nums = [1,2,3,4,5,6,7,8,9];
//     var newNums = nums.map(function(e) {
//         return e * 2;
//     });
//     console.log("output =>")
//     for (var i = 0; i<newNums.length - 1; i++) {
//         console.log((i +1) + "º pareja: " +newNums[i]+ " - " +newNums[i+1]);
//     }
// }

// newArray();


// // a1) La funcion debería aceptar la array a tratar como argumento.
// // a2) Pasa también el numero a multiplicar a la función como argumento.
// // a3) La función debería ser capaz de recibir el numero de parejas que queremos devolver del total.

// var nums = [1,2,3,4,5,6,7,8,9];

// function newArray(array, mult, res) {
//     var newNums = array.map(function(e) {
//         return e * mult;
//     });
//     console.log("output =>")
//     for (var i = 0; i<res; i++) {
//         console.log((i +1) + "º pareja: " +newNums[i]+ " - " +newNums[i+1]);
//     }
// }

// newArray(nums,2,3);


// // b) Volvemos a la numeros... Podrias hacer una funcion que mostrara por pantalla la serie Fibonacci?

// function fibo(limit) {
//     var fibonacci = [0,1];
//     for(var i = 2; i<limit; i++) {
//         fibonacci.push(fibonacci[i-1] + fibonacci[i-2]);
//     }
//     console.log(fibonacci.join(", "));
// }

// fibo(25);


// // b2) Puedes añadir además, la posición de cada resultado?
// // b3) Ahora, inserta los resultados en una array y muestralos todos juntos de una manera amigable.
// // b4) Ahora, el usuario debería ser capaz de especificar la posición de la serie hasta donde queremos llegar.


// function fibo(limit) {
//     var fibonacci = [0,1];
//     for(var i = 2; i<limit; i++) {
//         fibonacci.push(fibonacci[i-1] + fibonacci[i-2]);
//     }
//     var pos = 0;
//     var fiboPos = fibonacci.map(function(e) {
//         pos++;
//         return (e+ " - pos " +pos+ "º");
//     });
//     console.log(fiboPos.join("\n"));
// }

// fibo(25);


// // b5) Ahora, muestra los resultados en forma piramidal:

// function fibo(limit) {
//     var fibonacci = [0,1];
//     for(var i = 2; i<limit; i++) {
//         fibonacci.push(fibonacci[i-1] + fibonacci[i-2]);
//         console.log(fibonacci);
//     }
//     for(var i = limit - 1;i>2; i--) {
//         fibonacci.pop();
//         console.log(fibonacci);
//     }
// }

// fibo(10);



// // c) Simple Scripting program. Crea un programa que transforme un número de 4 dígitos en otro diferente con las posiciones de los dígitos cambiadas, creando un nuevo código

// var code = 3712;

// function changeOrder() {
//     for(var i = 0; i<4; i++) {
//         var number = code.toString();
//         var first = number.slice(0,1);
//         var rest = number.slice(1,number.length);
//         code =  parseInt(rest + first);
//         console.log(code);
//     }
// }

// changeOrder();



// c2) Ahora, el usuario debería poder introducir como parámetro dos códigos a la vez y devolver los dos códigos encriptados (Los dos códigos se deberían encriptar en la misma función)

function changeOrder(code) {
    var acc = code.toString();
    for(var i = 0; i<acc.length; i++) {
        var number = code.toString();
        var first = number.slice(0,1);
        var rest = number.slice(1,number.length);
        code =  parseInt(rest + first);
        console.log(code);
    }
}

function codeScript(code1,code2) {
    changeOrder(code1);
    changeOrder(code2);
}

codeScript(3712,8967);


// c3) Ahora, vamos a añadir un nivel más de seguridad. Despues de cambiar la posición de los dígitos, multiplicaremos a cada miembro por un numero cuya multiplicación no sea superior a 10. (Si es superior a 10, conseguiremos una multplicación de dos digitos y el código ya no sería de 4 valores)


