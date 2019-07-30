var results =[];

function calculator(firstNum, secondNum) {
    
    if(typeof firstNum !== 'number') throw TypeError(firstNum + ' is not a number');
    
    
    if (arguments.length < 2) {
        function square(firstNum) {
            var resultSquare = firstNum * firstNum;
            return 'El cuadrado de ' + firstNum + ' es: ' + resultSquare;
        }
        return square(firstNum);
    } else {
        if(typeof secondNum !== 'number') throw TypeError(secondNum + ' is not a number');

        

        function add(firstNum, secondNum) {

            var resultAdd = firstNum + secondNum;
            return console.log('El resultado de la suma es =' +resultAdd);


        }



        function substract(firstNum, secondNum) {

            var resultSubstract = firstNum - secondNum;
            return console.log('El resultado de la resta es =' + resultSubstract);

        }



        function multiply(firstNum, secondNum) {

            var resultMultiply = firstNum * secondNum;
            return console.log('El resultado de la multiplicación es =' +  resultMultiply);

        }



        function divide(firstNum, secondNum) {

            var resultDivide = firstNum / secondNum;
            return console.log('El resultado de la division es =' +resultDivide);

        }

        results = [add(firstNum, secondNum),substract(firstNum, secondNum),multiply(firstNum, secondNum), divide(firstNum, secondNum)]

        // return add(firstNum, secondNum) + '\n' + substract(firstNum, secondNum) + '\n' + multiply(firstNum, secondNum) + '\n' + divide(firstNum, secondNum);
    }
}
calculator(5, 2);

