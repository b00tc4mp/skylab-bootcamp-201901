function start() {
    var init = confirm("Bienvenido a la calculadora de SKYLAB. \nA continuación debera introducir 2 números y le mostraremos los resultados de las diferentes operaciones.");
    if(init) {
        var number1 = prompt("Introduzca el primer numero");
        var number2 = prompt("Introduzca el segundo numero");
        calculator(number1,number2);
    } else {
        return;
    }
}


function calculator(number1,number2) {
    // nada - nada & text - text
    if (((number1 === "") && (number2 === "")) || ((isNaN(number1) == true) && (isNaN(number2) == true))){
        alert("No has introducido ningun numero.");
        start();
    // number - nada    
    } else if ((isNaN(number1) == false) && (number2 === "")) {
        var result1 = Math.sqrt(number1);
        if(result1 % 1 !== 0) {
            result1 = result1.toFixed(3);
        }
        alert("La raiz cuadrada del numero introducido es " +result1);  
    // nada - number      
    } else if ((number1 === "") && (isNaN(number2) == false)) {
        var result2 = Math.sqrt(number2);
        if(result2 % 1 !== 0) {
            result2 = result2.toFixed(3);
        }
        alert("La raiz cuadrada del numero introducido es " +result2);
    // text - nada    
    } else if ((isNaN(number1) == true) && (number2 === "")) {
        alert("No has introducido ningun numero.");
        start();
    // nada - text    
    } else if ((number1 === "") && (isNaN(number2) == true)) {
        alert("No has introducido ningun numero.");
        start();
    // text - number    
    } else if ((isNaN(number1) == true) && (isNaN(number2) == false)) {
        alert("El primer valor introducido no es un numero.");
        start();
    // number - text    
    } else if ((isNaN(number1) == false) && (isNaN(number2) == true)) {
        alert("El segundo valor introducido no es un numero.");
        start();
    // number - number    
    } else {
        number1 = Number(number1);
        number2 = Number(number2);
        var sum = number1 + number2;
        if(sum % 1 != 0) {
            sum = sum.toFixed(3);
        }
        var res = number1 - number2;
        if(res % 1 != 0) {
            res = res.toFixed(3);
        }
        var mul = number1 * number2;
        if(mul % 1 != 0) {
            mul = mul.toFixed(3);
        }
        var div = number1 / number2;
        if((number1 == 0) && (number2 == 0)) {
            div = 0;
        } else if (div % 1 != 0) {
            div = div.toFixed(3);
        }
        
        alert("El resultado de sumar los numeros es: " + sum + "\nEl resultado de restar los numeros es: " + res+ "\nEl resultado de multiplicar los numeros es: " + mul + "\nEl resultado de dividir los numeros es: " + div);
    }
}

start();