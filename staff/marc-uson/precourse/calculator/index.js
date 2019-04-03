/*Haz una calculadora. Un único programa al que le pasarás dos parámetros y el usuario podrá visualizar por consola
 la suma, resta, multiplicación y división entre ambos números. El resultado debería ser mostrado con 3 decimales 
 como mucho (En caso de que hubieran). El programa debe contemplar y actuar correctamente en el caso de que el 
 usuario introduzca cualquier cosa que no sean números. */

//-  Si el usuario introduce un solo numero, deberá mostrar SOLO su raíz cuadrada, si vuelve a introducir los dos, volverá a mostrar las 4 operaciones de siempre.

//- Los resultados deberían almacenarse dentro de una array y mostrarlos de una forma amigable al usuario.

var operatorsArray = []; //definimos un array vacio donde introduciremos los operadores par realizar nuestro calculo.
var question = prompt("Welcome to calculator! first, write how many operators you want to introduce:")

setCalculator(question, operatorsArray)

do {

    switch (question){
        case 'y':
            question = prompt("How many operators?");
            setCalculator(question, operatorsArray);
        
        case 'n':
            break;

        default:
            question = prompt("Incorrect answer! New numbers? y/n");
    }
}while (question != 'n');

console.log ('OK, Bye!');


function add(){             //sumamos todos los argumentos pasados
    var resultAdd = 0;
    for (var i = 0; i < operatorsArray.length; i++){
        resultAdd += operatorsArray[i];
    }
    if (! Number.isInteger(resultAdd)){
         resultAdd = roundDecimals(resultAdd);
    }
    return "El resultado de la suma es: " + resultAdd.toString(); 
}

function substract(){       //cogerermos el primer argumento y le restará los demas argumentos
    var resultSubs = operatorsArray[0];
    for (var i = 1; i < operatorsArray.length; i++){
        resultSubs -= operatorsArray[i];
    }
    if (! Number.isInteger(resultSubs)){
        resultSubs = roundDecimals(resultSubs);
    }
    return "El resultado de la resta es: " + resultSubs.toString();
}

function multi(){           //multiplicamos el primer argumento al segundo, el resultado al tercero y así sucesivamente.
    var resultMult = operatorsArray[0];
    for (var i = 1; i < operatorsArray.length; i++){
        resultMult *= operatorsArray[i];
    }
    if (! Number.isInteger(resultMult)){
        resultMult = roundDecimals(resultMult);
    }
    return  "El resultado de la multiplicación es: " + resultMult.toString();
}

function div(){             // cogeremos el primer argumento y lo dividiremos por el segundo, su resultado lo dividiremos por el tercero, y así sucesivamente
    var resultDiv =operatorsArray[0];
    for (var i = 1; i < operatorsArray.length; i++){
        resultDiv /= operatorsArray[i];
    }
    if (! Number.isInteger(resultDiv)){
        resultDiv = roundDecimals(resultDiv);
    }
    return  "El resultado de la división es: " +  resultDiv.toString();
}

function roundDecimals (number){ //si el numero que pasamos tiene mas de tres decimales, lo cortaremos en 3 decimales
            
    var decimals = (number + "").split(".")[1].length; //retorna numero de decimales que contiene la variable numerica resultAdd
    
    if (decimals > 3){
        number = number.toFixed(3);
    }
    
    return number; 

}

function calculator (operatorsArray){
    
    var resultArray= [];
    
    if(operatorsArray.length >= 2){
        
      add();
      substract();
      multi();
      div(); 

        resultArray.push(add(), substract(), multi(), div());
    }
    else if(operatorsArray.length == 1){
        var resultSqrt = Math.sqrt(operatorsArray[0]);
        if (! Number.isInteger(resultSqrt)){
            resultSqrt = roundDecimals(resultSqrt);
        }
        var str1 = 'El resultado de la raiz cuadrada de ';
        var str2 = ' es: ';
        var str = str1.concat(arguments[0].toString(), str2, resultSqrt.toString() );
        resultArray.push(str);
    }

    else if (arguments.length < 1){
        var str3 = 'demasiados pocos argumentos para realizar ningun calculo';
        resultArray.push(str3);
    }
    console.log(resultArray);
}

function setCalculator (answer, arrayOfOperators){ //funcion donde tratamos la respuesta de prompt y llamamos a la funcion calculator
    var numOperator;
    var argument;
    var numArguments = parseInt(question);

    while (!Number.isInteger(numArguments)|| numArguments===0){
        question = prompt("you should introduce a number of operators! Try again:")
        numArguments = parseInt(question);
    }
    
    for (var j = 0; j < numArguments; j++){
        argument = j + 1;
        question = prompt ("write operator " + argument );
        numOperator = parseFloat(question);
        while(Number.isNaN(numOperator)){
            question = prompt("you must write a number! Write operator " + argument );
            numOperator = parseFloat(question);
        }
        operatorsArray.push(numOperator);   
    }
    
    calculator(operatorsArray);
    operatorsArray = [];
    
    question = prompt("New numbers? y/n");
    
}