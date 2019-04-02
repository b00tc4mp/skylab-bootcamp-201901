let results = [];
let suma;
let resta;
let multiplicacion;
let division;
let raizCuadrada;
let firstNum = parseInt(prompt ('Por favor, introduce el primer número'))
let secondNum = parseInt(prompt ('Ahora introduce el segundo'))


const calculator = function (firstNum, secondNum){
    if (isNaN(firstNum) && isNaN(secondNum)){
        return "You are making a mistake. Try again"
    }
  
    if (typeof firstNum === 'number' && typeof secondNum === 'number' && !isNaN(firstNum) && !isNaN(secondNum)){
        suma = firstNum + secondNum;
        resta = firstNum - secondNum;
        multiplicacion = firstNum * secondNum;
        division = firstNum / secondNum;

        if (!Number.isInteger(suma)){
            suma = suma.toFixed(3)
        }
        results.push(firstNum + ' + ' + secondNum + ' = ' + suma)

        if (!Number.isInteger(resta)){
            resta = resta.toFixed(3)
        }  
        results.push(firstNum + ' - ' + secondNum + ' = ' + resta)
        
        if (!Number.isInteger(multiplicacion)){
           multiplicacion = multiplicacion.toFixed(3)
        } 
        results.push(firstNum + ' * ' + secondNum + ' = ' + multiplicacion)

        if (!Number.isInteger(division)){
           division = division.toFixed(3)
        }
        results.push(firstNum + ' / ' + secondNum + ' = ' + division)
           return ('Los resultados son ' + results)
        
    }
  
    if (!isNaN(firstNum)){
        raizCuadrada = Math.sqrt(firstNum);
        return raizCuadrada.toFixed(3)
    }
  
    if (!isNaN(secondNum)){
        raizCuadrada = Math.sqrt(secondNum);
        return raizCuadrada.toFixed(3)
    } 
}

console.log(calculator(firstNum, secondNum));