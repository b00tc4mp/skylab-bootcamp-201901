var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

const RegExIsOperation = new RegExp('^\\s*(-?(\\d+(\\.\\d+)?))\\s*(([-+\\*\\/])\\s*(\\d+(\\.\\d+)?))*\\s*$');
const RegExIsSquareRoot = new RegExp('^\\s*(-?(\\d+(\\.\\d+)?))\\s*$');
const RegExIsOperator = new RegExp('[-+*\\/]');
const RegExIsMultDiv = new RegExp('[\\*\\/]');
const RegExIsSumSub = new RegExp('^[\\+|\\-]$');
const RegExIsNumber = new RegExp('[0-9]');
const RegExIsDigit = new RegExp('^\\d+(\\.?\\d)*$');
const RegExIsDot = new RegExp('.');

var operationArray = [];

var Operation = {
    num1: 0,
    num2: 0,
    operator: '',
    result: null,
    strToNumber: function() {
        const RegExIsFloat = new RegExp('^\\d+\\.\\d+$');
        if(RegExIsFloat.test(arguments[0])){
            return parseFloat(arguments[0]);
        } else {
            return parseInt(arguments[0]);
        }
    },

    doSingleOperation: function() {
        switch (this.operator) {
            case '*':
                return this.num1 * this.num2;
            case '/':
                 return this.num1 / this.num2;
            case '+':
                 return this.num1 + this.num2;
            case '-':
                return this.num1 - this.num2;
        }
    }    
};


/*
var userInput = '     8.1  ';
var userInput_2 = '-9.9*2/2+3-1';

getUserInputProcessed(userInput_2);

*/

//  GET INPUT FORM PROMPT


rl.question('+ Daniel calculator in process... \n More than one number do the operation, just one you get square root: \n + Enter operation -->', function(userInput) {

    var ui1 = userInput;
    rl.setPrompt('+ Result');
    getUserInputProcessed(ui1);
    rl.on('line', function(userInput2) {
        rl.setPrompt('+ Enter again your operation or type "exit" to end the calculator:');
        rl.prompt();
        var ui = userInput2;
        console.log(ui);
        getUserInputProcessed(ui);
       
    });

});



//  CALCULATE INPUT FROM PROMPT

function getUserInputProcessed() {
    var rawUserInput = arguments[0].replace(/\s/g, '');
     if(RegExIsOperation.test(rawUserInput)) {
        var result = operateUserInput(rawUserInput);
        return result;
     } else {
        console.log('Enter a valid input...');
     }
} 

function operateUserInput() {
    var userPromptInput = arguments[0];
    if (operationPicker(userPromptInput)) {
        var strArrayOperation = splitNumberOperatorsStrArray(userPromptInput);
        var arrayOperationsNumber = getStrToNumberArray(strArrayOperation);
        var arrayMultiplicationDivisionResult = operateMultiplicationDivision(arrayOperationsNumber);
        var resultOperation = arraySumSubstracResult(arrayMultiplicationDivisionResult);
        console.log(resultOperation);
        return resultOperation;
        

    } else {
        if(isNaN(Math.sqrt(userPromptInput[0]))) {
            console.log('+ Root numbers can not be negative...');
        } else {
            console.log(Math.sqrt(userPromptInput[0]));
            return Math.sqrt(userPromptInput[0]);
        }
    }
}  

function operationPicker() {
    var inputPickOperation = arguments[0];
    if(RegExIsSquareRoot.test(inputPickOperation)) {
        console.log('+ Making square root...');
        return false;
    } else if (RegExIsOperation.test(inputPickOperation)) {
        console.log('+ Making operation...');
        return true;
    }
}

function splitNumberOperatorsStrArray() {
    var inputOperationSplit = arguments[0];
    var strArrayAllOperations = [];
    var strSingleNumber = '';
    for(let i = 0; i < inputOperationSplit.length; i++){
        if (RegExIsOperator.test(inputOperationSplit.charAt(i))) {
            strArrayAllOperations.push(inputOperationSplit.charAt(i));
        }
        for(let j = i; j < inputOperationSplit.length && !RegExIsOperator.test(inputOperationSplit.charAt(j)); j++){
            strSingleNumber += inputOperationSplit.charAt(j);
           
            i = j;
        }

        if(!RegExIsOperator.test(inputOperationSplit.charAt(i))) {
            strArrayAllOperations.push(strSingleNumber);
            strSingleNumber = '';
        }

    }
    return strArrayAllOperations;
}

function getStrToNumberArray() {
    var arrayStrOperationsProcessing = arguments[0];
    var arrayNumbers = [];
    for(let i = 0; i < arrayStrOperationsProcessing.length; i++){
        if (RegExIsDigit.test(arrayStrOperationsProcessing[i])) {
            var digit = Operation.strToNumber(arrayStrOperationsProcessing[i]);
            arrayNumbers[i] = digit;
        } else {
            arrayNumbers[i] = arrayStrOperationsProcessing[i];
        }
    }
    return arrayNumbers;
}

function operateMultiplicationDivision(){

    var arrayOperationMultDivResult = arguments[0];
    var isMultDiv = false;
    if(arrayOperationMultDivResult.includes('*', '/')){
        for(let i = 0; i < arrayOperationMultDivResult.length; i++){
            isMultDiv = RegExIsMultDiv.test(arrayOperationMultDivResult[i]);
            if(isMultDiv){
                Operation.num1 = arrayOperationMultDivResult[i - 1];
                Operation.num2 = arrayOperationMultDivResult[i + 1];
                Operation.operator = arrayOperationMultDivResult[i];
                arrayOperationMultDivResult.splice(i - 1, 3, Operation.doSingleOperation());
                i -=2;
            } 
        }
    } else {
        return arrayOperationMultDivResult;
    }
    return arrayOperationMultDivResult;
}

function arraySumSubstracResult() {

    var arrayOperationSumSubResult = arguments[0];
    var isSumSub = false;

    if(arrayOperationSumSubResult[0] == '-') {
        var negativeNumber = arrayOperationSumSubResult[1] * -1;;
        arrayOperationSumSubResult.splice(0, 2, negativeNumber);
    }
    for(let i = 1; i < arrayOperationSumSubResult.length; i++){
        isSumSub = RegExIsSumSub.test(arrayOperationSumSubResult[i]);
        if(isSumSub){
            Operation.num1 = arrayOperationSumSubResult[i - 1];
            Operation.num2 = arrayOperationSumSubResult[i + 1];
            Operation.operator = arrayOperationSumSubResult[i];
            arrayOperationSumSubResult.splice(i - 1, 3, Operation.doSingleOperation());
            if(arrayOperationSumSubResult.length > 2)i = 0;
        }
    }
    return arrayOperationSumSubResult[0];
}


