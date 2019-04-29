var numCurrent = "0";
var numPrevious = "0";
var operator = "";
const MAX_SIZE_DISP = 15;

function showNum(num) {
    if (numCurrent.length < MAX_SIZE_DISP) {
        if(numCurrent == "0" && numCurrent !== "0."){
            numCurrent = num;
        } else {
            numCurrent += num;
        }
        refreshBoxValue();    
    };
};


function showDecimalPoint() {
    if(numCurrent == "0") {
        numCurrent = "0.";
    } else if(numCurrent.indexOf(".") == -1) {
        numCurrent += '.';
    }
    refreshBoxValue();
};


function showOperator(oper) {
    if (numCurrent == "0"){
        numCurrent = document.getElementById("numValue").value;
    }
    numPrevious = numCurrent;
    numCurrent= "0";
    if (operator !== "") {
        resetColorButtonOperator(operator);
    }
    operator = oper;
    event.target.style.backgroundColor = "#a0c5d4";
};


function doOperation() {
    var num1 = parseFloat(numPrevious);
    var num2 = parseFloat(numCurrent);
    var result = 0;
    switch (operator){
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "x":
            result = num1 * num2;
            break;
        case "/":
            result = num1 / num2;
            break;
    };
    numCurrent = result.toString();
    refreshBoxValue();
    resetColorButtonOperator(operator);
    numPrevious = numCurrent;
    numCurrent = "0";
    operator = "";    
};


function clearValue() {
    numCurrent = "0";
    numPrevious = "0";
    if (operator !== "") {
        resetColorButtonOperator(operator);
        operator = "";    
    };
    refreshBoxValue();
};


function refreshBoxValue() {
    var displayValue = "";
    if (numCurrent.length > MAX_SIZE_DISP && !numCurrent.includes('.')) {
        displayValue = "Overflow"
    } else {
        displayValue = numCurrent.slice(0, MAX_SIZE_DISP)
    };
    document.getElementById("numValue").value = displayValue;
};


function resetColorButtonOperator(operator) {
    var idElement = "";
    switch (operator){
        case "+":
            idElement = "sum";
            break;
        case "-":
            idElement = "subs";
            break;
        case "x":
            idElement = "mult";
            break;
        case "/":
            idElement = "div";
            break;
    };
    document.getElementById(idElement).style.backgroundColor = "#009ee2";
};