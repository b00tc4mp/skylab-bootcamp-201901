/*Haz una calculadora. Un único programa al que le pasarás dos parámetros y el usuario podrá visualizar por consola la suma, resta, 
multiplicación y división entre ambos números. El resultado debería ser mostrado con 3 decimales como mucho (En caso de que hubieran). 
El programa debe contemplar y actuar correctamente en el caso de que el usuario introduzca cualquier cosa que no sean números.

Si el usuario introduce un solo numero, deberá mostrar SOLO su raíz cuadrada, si vuelve a introducir los dos, volverá a mostrar 
las 4 operaciones de siempre.
Los resultados deberían almacenarse dentro de una array y mostrarlos de una forma amigable al usuario.
Hint_ => results = [num1 + num2 = resultSum, num1-num2 = resultRest ....]*/


function calculadora(num1,num2){

    
if (typeof num1=== "number" && typeof num2 === "number"){
    resultSum = Math.round((num1 + num2)*1000)/1000;
    resultRest = Math.round((num1 - num2)*1000)/1000;
    resultMult = Math.round((num1 * num2)*1000)/1000;
    resultDiv = Math.round((num1 / num2)*1000)/1000;
    result = [resultSum, resultRest, resultMult, resultDiv]; 
    console.log(result);
}else if (typeof num1=== "number" && typeof num2 !== "number"){
    sqrt_1 = Math.sqrt(num1);
    result_sqrt1 = [Math.round((sqrt_1)*1000)/1000];
    console.log (result_sqrt1);
    console.log("variable num2 it's not a number");
}else if (typeof num1!== "number"&& typeof num2 === "number"){
    sqrt_2 = Math.sqrt(num2);
    result_sqrt2 = [Math.round((sqrt_2)*1000)/1000];
    console.log (result_sqrt2);
    console.log("variable num1 it's not a number");
}else{
    console.log("It's not a number. Please, enter a number");
}  

}
calculadora(4,6);


//modifico

function calculadora(num1,num2){

    
if (typeof num1=== "number" && typeof num2 === "number"){
    resultSum = Math.round((num1 + num2)*1000)/1000;
    resultRest = Math.round((num1 - num2)*1000)/1000;
    resultMult = Math.round((num1 * num2)*1000)/1000;
    resultDiv = Math.round((num1 / num2)*1000)/1000;
        if (num1=== 0 && typeof num2 === 0){
            return resultDiv === "Infinity"
        }
    result = num1 + " + " + num2 + " = " + resultSum, num1 + " - " + num2 + " = " + resultRest, num1 + " * " + num2 + " = " + resultMult, 
            num1 + " / " + num2 + " = " + resultDiv; 
    console.log(result);
}else if (typeof num1=== "number" && typeof num2 !== "number"){
    sqrt_1 = Math.sqrt(num1);
    result_sqrt1 = [Math.round((sqrt_1)*1000)/1000];
    console.log (result_sqrt1);
    console.log("Variable number 2 it's not a number");
}else if (typeof num1!== "number"&& typeof num2 === "number"){
    sqrt_2 = Math.sqrt(num2);
    result_sqrt2 = [Math.round((sqrt_2)*1000)/1000];
    console.log (result_sqrt2);
    console.log("Variable number 1 it's not a number");

}else{
    console.log("It's not a number. Please, enter a number");
}  

}
calculadora(4,6);



/* el result, s'ha de mostrar aixi :  ["4 + 6 = 10", "4 - 6 = -2", "4 * 6 = 24", "4 / 6 = 0.667"]
o bé: result = [resultSum, resultRest, resultMult, resultDiv]; => [10, -2, 24, 0.667] */

//torno a enviar: 


function calculadora(num1,num2){

if (num1=== 0 && num2 === 0){
    resultSum = Math.round((num1 + num2)*1000)/1000;
    resultRest = Math.round((num1 - num2)*1000)/1000;
    resultMult = Math.round((num1 * num2)*1000)/1000;
    resultDiv = "Indeterminado"
    console.log('La suma de ' + num1 + ' mas ' + num2 + ' es igual a ' + resultSum);
	console.log('La resta de ' + num1 + ' menos ' + num2 + ' es igual a ' + resultRest);
    console.log('La multiplicación de ' + num1 + ' por ' + num2 + ' es igual a ' + resultMult);
    console.log('La división de ' + num1 + ' por ' + num2 + ' es ' + resultDiv);
    
}else if (typeof num1=== "number" && typeof num2 === "number"){
    resultSum = Math.round((num1 + num2)*1000)/1000;
    resultRest = Math.round((num1 - num2)*1000)/1000;
    resultMult = Math.round((num1 * num2)*1000)/1000;
    resultDiv = Math.round((num1 / num2)*1000)/1000;
    console.log('La suma de ' + num1 + ' mas ' + num2 + ' es igual a ' + resultSum);
	console.log('La resta de ' + num1 + ' menos ' + num2 + ' es igual a ' + resultRest);
    console.log('La multiplicación de ' + num1 + ' por ' + num2 + ' es igual a ' + resultMult);
    console.log('La división de ' + num1 + ' por ' + num2 + ' es igual a ' + resultDiv);

}else if (typeof num1=== "number" && typeof num2 !== "number"){
    sqrt_1 = Math.sqrt(num1);
    result_sqrt1 = [Math.round((sqrt_1)*1000)/1000];
    console.log (result_sqrt1);
    console.log("La variable número 2 no es un número");
}else if (typeof num1!== "number"&& typeof num2 === "number"){
    sqrt_2 = Math.sqrt(num2);
    result_sqrt2 = [Math.round((sqrt_2)*1000)/1000];
    console.log (result_sqrt2);
    console.log("La variable número 1 no es un número");
    
}else{
    console.log("Por favor, entre un número válido");
    }  
    
}
calculadora(0,0);


