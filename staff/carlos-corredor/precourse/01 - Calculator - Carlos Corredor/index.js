alert('Introduce dos valores para calcular la suma, resta, multiplicación y división entre ellos. En caso de introducir sólo un número, la calculadora devolverá la raíz cuadrada de dicho número');
let num1 = (prompt('Introduce un número'));
let num2 = (prompt('Introduce otro número'));
if(num1 === '' || num1 === null){
    num1 = undefined;
} else if (!isNaN(parseFloat(num1))){
    num1 = parseFloat(num1);
};
if(num2 === '' || num2 === null){
    num2 = undefined;
} else if (!isNaN(parseFloat(num2))){
    num2 = parseFloat(num2);
};
let results = [];
let equal = '='; // Para ser cambiado por "equivalente a" (≡) cuando el divisor sea cero y el resultado sea equivalente a infinito.
const error1 = 'The parameters must be numbers';
const error2 = 'The parameter must be greater or equal to zero';
const round1 = function (r){
   return Math.round(r*1000)/1000
};
const sum = function (n1, n2){
    return round1(n1 + n2);
};
const sub = function (n1, n2){
    return round1(n1 - n2);
};
const mul = function (n1, n2){
    return round1(n1 * n2);
};
const div = function (n1, n2){
    if (n2 === 0){
        return '∞';
    };
    return round1(n1 / n2);
};
function restart () {
    num1 = undefined;
    num2 = undefined;
    results = [];
    equal = '=';
}; // Para reiniciar la calculadora con el objetivo de mostrar varios ejemplos de una vez.

function calc (x,y){
    if (typeof x === 'undefined' && typeof y === 'undefined'){
        alert(error1);
        return;
    } else if ((typeof x !== 'number' && typeof x !== 'undefined') || (typeof y !== 'number' && typeof y !== 'undefined')) {
        /* debido a que 'undefined' no es un número, si el usuario introduce un sólo parámetro,
        saldría el mensaje "error1" en lugar de calcular la raíz cuadrada del número */
        alert(error1);
        return;
    } else if (x && typeof y === 'undefined') {
        if (x<0) {
            alert(error2);
            return;
        } else {
        var sqrt1 = `√${x} = ` + round1(Math.sqrt(Math.abs(x))); // Math.abs(): previniendo la posibilidad de que el usuario introduzca un número negativo
        results.push(sqrt1);
        alert(results);
        restart();
        return;
        }
        
    } else if (y && typeof x === 'undefined'){
        if (y<0) {
            alert(error2);
            return;
        } else {
            var sqrt = `√${y} = ` + round1(Math.sqrt(Math.abs(y))); // Math.abs(): previniendo la posibilidad de que el usuario introduzca un número negativo
            results.push(sqrt);
            alert(results);
            restart();
            return;
        }
    } else {
        if (y === 0){
            equal = '≡';
        }
        results.push(x + ' + ' + y + ' = ' + sum(x, y), x + ' - ' + y + ' = ' + sub(x, y), x + ' · ' + y + ' = ' + mul(x, y), x + ' ÷ ' + y + ` ${equal} ` + div(x,y));
            alert(results.join(' | '));
            restart();
            return;


    }
};
calc(num1, num2);

