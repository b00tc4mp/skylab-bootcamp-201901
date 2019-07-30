// Script para cazar los numeros y lo operadores por teclado;
document.onkeypress = function(){
    let key = String.fromCharCode(event.keyCode);
    let keyCheck = event.keyCode;
    let numbers = ["0","1","2","3","4","5","6","7","8","9"];
    let operators = ["+","-","*","/"];

    //Compruena si son numeros
    for (i = 0; i < numbers.length; i++){
        if (key === numbers[i]) {
            return document.getElementById('result').value += key;
        } else {continue;}
    }

    for (i = 0; i < numbers.length; i++){
        if (key === operators[i]) {
            return document.getElementById('result').value += key;
        } else {continue;}
    }
    
    if (keyCheck === 13){return results();}  // Si es Intro -> Resultado 

    if (keyCheck === 32) {return erase();}  // Si es Espacio -> Borra 
}

//Funcion introductoria por click en boton;
function calculator(n){
    return document.getElementById('result').value += n;
}

//Funcion para mostrar resultado
function results(){
    let working = document.getElementById("result").value;

    if (working[0] === "/" || working[0] === "*"){
        document.getElementById('result').value = "ERROR";
    } else {
        document.getElementById('result').value = String(eval(working));
    }
}


//Funcion para borrar
function erase(){
    document.getElementById('result').value = "";
}