/*Haz una calculadora. Un único programa al que le pasarás dos parámetros y 
el usuario podrá visualizar por consola la suma, resta, multiplicación y 
división entre ambos números. El resultado debería ser mostrado 
con 3 decimales como mucho (En caso de que hubieran). 
El programa debe contemplar y actuar correctamente en el caso de que 
el usuario introduzca cualquier cosa que no sean números.

Si el usuario introduce un solo numero, deberá mostrar SOLO su raíz cuadrada,
si vuelve a introducir los dos, volverá a mostrar las 4 operaciones de siempre.
Los resultados deberían almacenarse dentro de una array y 
mostrarlos de una forma amigable al usuario.
// Output
results = [num1 + num2 = resultSum, num1 - num2 = resultRest, ...]*/

let sumMessage = null;
let subMessage = null;
let multMessage = null;
let divMessage = null;

function calculator() {
        let num1 = parseFloat(document.getElementById('n1').value);
        let num2 = parseFloat(document.getElementById('n2').value);
    
    function roundto3(num) {
        if (num === parseFloat(num)) {
            return num;
        }
        return num.toFixed(3);
    }
    function sum(n1, n2) {
        return roundto3(n1 + n2);
    }
    function sub(n1, n2) {
        return roundto3(n1 - n2);
    }
    function mult(n1, n2) {
        return roundto3(n1 * n2);
    }
    function div(n1, n2) {
        if(n2===0){
            return '∞'
        } else {
            return roundto3(n1 / n2);
        }
    }
    if (num2 === undefined && typeof num1 === 'number') {
        return roundto3(Math.sqrt(num1));
    } else {
        if (typeof num1 !== 'number' || typeof num2 !== 'number') {
            return 'Please introduce a number.'
        } else {
            
            sumMessage = `${num1} + ${num2} = ${sum(num1, num2)}`;
            subMessage = `${num1} - ${num2} = ${sub(num1, num2)}`;
            multMessage = `${num1} * ${num2} = ${mult(num1, num2)}`;
            divMessage = `${num1} / ${num2} = ${div(num1, num2)}`;

            return [sumMessage, subMessage, multMessage, divMessage];
        }
    }
}

function getSum() {
    calculator();
    let resultsSum = document.getElementById("sum");
    resultsSum.innerHTML = sumMessage;
}
function getSub() { 
    calculator();
    let resultsSub = document.getElementById("sub");
    resultsSub.innerHTML = subMessage;
}
function getMult() {
    calculator();
    let resultsMult = document.getElementById("mult");
    resultsMult.innerHTML = multMessage;
}
function getDiv() {
    calculator();
    let resultsDiv = document.getElementById("div");
    resultsDiv.innerHTML = divMessage;
}
