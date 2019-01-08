/*
Haz una calculadora. Un único programa al que le pasarás dos parámetros 
y el usuario podrá visualizar por consola la suma, resta, multiplicación 
y división entre ambos números. El resultado debería ser mostrado con 3 
decimales como mucho (En caso de que hubieran). El programa debe contemplar 
y actuar correctamente en el caso de que el usuario introduzca cualquier cosa 
que no sean números.

Si el usuario introduce un solo numero, deberá mostrar SOLO su raíz cuadrada, 
si vuelve a introducir los dos, volverá a mostrar las 4 operaciones de siempre.
Los resultados deberían almacenarse dentro de una array y mostrarlos de una forma 
amigable al usuario.

Output
results = [num1 + num2 = resultSum, num1 - num2 = resultRest, ...]
*/

function add(num1, num2) {
    return Math.round((num1 + num2) * 1000) / 1000;
};
    
function substraction(num1, num2) {
    return Math.round((num1 - num2) * 1000) / 1000;
};
    
function multiply(num1, num2) {
    return Math.round((num1 * num2) * 1000) / 1000;
};
    
function division (num1, num2) {
    if (num2 === 0){
        return undefined
    } 
    
    return Math.round((num1 / num2) * 1000) / 1000;
};

function prettyAdd(num1, num2) {
    let result = add(num1, num2);
    return num1 + " + " + num2 + " = " + result;
};

function prettySubstraction(num1, num2) {
    let result = substraction(num1, num2);
    return num1 + " - " + num2 + " = " + result;
};

function prettyMultiply(num1, num2) {
    let result = multiply(num1, num2);
    return num1 + " * " + num2 + " = " + result;
};

function prettyDivision(num1, num2) {
    let result = division(num1, num2);
    return num1 + " / " + num2 + " = " + result;
};

function calculator(num1, num2) {
    if (Number.isFinite(num1) && num2 === undefined) {
        return 'La raíz cuadrada de este número es : ' + Math.round(Math.sqrt(num1) * 1000) / 1000;
       } else if (isNaN(num1) || isNaN (num2)) {
          return 'Por favor, introduzca dos números';
       }
    
    result = [];
    let a = prettyAdd(num1, num2);
    result.push(a);
    let b = prettySubstraction(num1, num2);
    result.push(b);
    let c = prettyMultiply(num1, num2);
    result.push(c);
    let d = prettyDivision(num1, num2);
    result.push(d);

    return 'Los resultados de las operaciones son los siguientes: ' + result.join(' , ')
};

console.log(calculator(23, 87.5))
console.log(calculator(0, 0))
console.log(calculator(0))
console.log(calculator(2345))
console.log(calculator('pepe', 0))
console.log(calculator(23, 'número'))
console.log(calculator('no es un número'))



// if (isNaN(num1) || isNaN (num2)) {
    //     return 'Por favor, introduzca dos números';
    // } else if (num2 === null){
    //     return 'La raíz cuadrada de este número es : ' + Math.round(Math.sqrt(num1) * 1000) / 1000;
    // }



   /*
    if (Number.isFinite(num1) && num2 === undefined) {
     return 'La raíz cuadrada de este número es : ' + Math.round(Math.sqrt(num1) * 1000) / 1000;
    } else if (isNaN(num1) || isNaN (num2)) {
       return 'Por favor, introduzca dos números';
    }
    */

    /*
    if (typeof num2 === 'undefined' || typeof num1 === 'string') {
        return 'La raíz cuadrada de este número es : ' + Math.round(Math.sqrt(num1) * 1000) / 1000;
    } else if (isNaN(num1) || isNaN (num2)) {
        return 'Por favor, introduzca dos números';
    }


    function division (num1, num2) {
    if (num1 === 0 && num2 === 0) {
        return undefined
    }else {
        return Math.round((num1 / num2) * 1000) / 1000;
    }   
};
division(0,0)
    */