/*Calculator! ➗➕
Haz una calculadora. Un único programa al que le pasarás dos parámetros y el usuario podrá visualizar por consola la suma, resta, multiplicación y división entre ambos números. El resultado debería ser mostrado con 3 decimales como mucho (En caso de que hubieran). El programa debe contemplar y actuar correctamente en el caso de que el usuario introduzca cualquier cosa que no sean números.

Si el usuario introduce un solo numero, deberá mostrar SOLO su raíz cuadrada, si vuelve a introducir los dos, volverá a mostrar las 4 operaciones de siempre.
Los resultados deberían almacenarse dentro de una array y mostrarlos de una forma amigable al usuario.

****PRO.

Podrías hacer que le calculadora relizara operaciones sean cuales sean el numero de argumentos pasados a la funcion?

*/

function sum(num1,num2){
    return "The sum result: "+(num1+num2).toFixed(3);
}

function substraction(num1,num2){
    return "The substraction result: "+(num1-num2).toFixed(3);
}

function multiplication(num1,num2){
    return "The multiplication result: "+(num1*num2).toFixed(3);
}

function division(num1,num2){
    return "The division result: "+(num1/num2).toFixed(3);
}

function squareRoot(num1,num2){
    if(num1){
        return "The square root result: "+(num1*num1).toFixed(3);
    }else if(num2){
        return "The square root result: "+(num2*num2).toFixed(3);
    }else{
        return "The square root of 0 is 0 asshole";
    }
}

console.log("PROYECT 1 --> CALCULATOR");

console.log("Enter the number that we are going to work with please:");


function calculator(num1,num2){

    if (typeof num1 ==='number' && typeof num2==='number'){
        if(num1 && num2){
          
            console.log([sum(num1,num2), substraction(num1,num2), multiplication(num1,num2), division(num1,num2)])
        
        }else{          
        
          console.log(squareRoot(num1,num2));          
        
        }             
    }else{
      
            console.log("Enter Integer number please")
    
    }
}

calculator(5,0);
calculator(6,'hola');
calculator(10,6);



