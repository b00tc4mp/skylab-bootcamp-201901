const SCREEN = document.querySelector("#screen");
const ONE = document.querySelector("#one");
const TWO = document.querySelector("#two");
const THREE = document.querySelector("#three");
const FOUR = document.querySelector("#four");
const FIVE = document.querySelector("#five");
const SIX = document.querySelector("#six");
const SEVEN = document.querySelector("#seven");
const EIGHT = document.querySelector("#eight");
const NINE = document.querySelector("#nine");
const ZERO = document.querySelector("#zero");
const EQUAL = document.querySelector("#equal");
const SUM = document.querySelector("#sum");
const RES = document.querySelector("#res");
const MULT = document.querySelector("#mult");
const DIV = document.querySelector("#div");
const RESET = document.querySelector("#reset");
const DOT = document.querySelector("#dot");


var numbers = [];
var number1 = "";
var number2 = "";
var operator = 0;

function insertData(data) {
    numbers.push(data);
    console.log(numbers);
}

function resetCalc() {
    numbers = [];
    number1 = "";
    number2 = "";
    operator = 0;
    SCREEN.innerHTML = 0;
}

function calculator() {
    number1 = Number(number1);
    number2 = Number(number2);
    switch(operator) {
        case "+":   var sum = number1 + number2;
                    if(sum % 1 != 0) {
                        sum = sum.toFixed(3);
                    }
                    SCREEN.innerHTML = sum;
                    break;
        
        case "-":   var res = number1 - number2;
                    if(res % 1 != 0) {
                        res = res.toFixed(3);
                    }
                    SCREEN.innerHTML = res;
                    break;


        case "*":   var mul = number1 * number2;
                    if(mul % 1 != 0) {
                        mul = mul.toFixed(3);
                    }
                    SCREEN.innerHTML = mul;
                    break;


        case "/":   var div = number1 / number2;
                    if((number1 == 0) && (number2 == 0)) {
                        div = 0;
                    } else if (div % 1 != 0) {
                        div = div.toFixed(3);
                    }
                    SCREEN.innerHTML = div;
                    break;
    }
}


function extractNumbers() {
    if(isNaN(numbers[0])) {
        resetCalc();
    } else {
        for (var i=0; i<numbers.length; i++) {
            if(numbers[i] == "+" || numbers[i] == "-" || numbers[i] == "*" || numbers[i] == "/") {
                operator = numbers[i];
                var mark = [i];
                mark++;
                break;
            }
        }
        number1 = (numbers.slice(0,(mark-1))).join("");
        number2 = (numbers.slice(mark,numbers.length)).join("");
        console.log(operator);
        console.log(number1);
        console.log(number2);
    }
}


ONE.addEventListener("click", function(e) {
    insertData(ONE.value);
    SCREEN.innerHTML = numbers.join("");
});

TWO.addEventListener("click", function(e) {
    insertData(TWO.value);
    SCREEN.innerHTML = numbers.join("");
});

THREE.addEventListener("click", function(e) {
    insertData(THREE.value);
    SCREEN.innerHTML = numbers.join("");
});

FOUR.addEventListener("click", function(e) {
    insertData(FOUR.value);
    SCREEN.innerHTML = numbers.join("");
});

FIVE.addEventListener("click", function(e) {
    insertData(FIVE.value);
    SCREEN.innerHTML = numbers.join("");
});

SIX.addEventListener("click", function(e) {
    insertData(SIX.value);
    SCREEN.innerHTML = numbers.join("");
});

SEVEN.addEventListener("click", function(e) {
    insertData(SEVEN.value);
    SCREEN.innerHTML = numbers.join("");
});

EIGHT.addEventListener("click", function(e) {
    insertData(EIGHT.value);
    SCREEN.innerHTML = numbers.join("");
});

NINE.addEventListener("click", function(e) {
    insertData(NINE.value);
    SCREEN.innerHTML = numbers.join("");
});

ZERO.addEventListener("click", function(e) {
    insertData(ZERO.value);
    SCREEN.innerHTML = numbers.join("");
});

DOT.addEventListener("click", function(e) {
    insertData(DOT.value);
    SCREEN.innerHTML = numbers.join("");
});

SUM.addEventListener("click", function(e) {
    insertData(SUM.value);
    SCREEN.innerHTML = numbers.join("");
});

RES.addEventListener("click", function(e) {
    insertData(RES.value);
    SCREEN.innerHTML = numbers.join("");
});

MULT.addEventListener("click", function(e) {
    insertData(MULT.value);
    SCREEN.innerHTML = numbers.join("");
});

DIV.addEventListener("click", function(e) {
    insertData(DIV.value);
    SCREEN.innerHTML = numbers.join("");
});

EQUAL.addEventListener("click", function(e) {
    extractNumbers();
    calculator();
});

RESET.addEventListener("click", function(e) {
    resetCalc();
});


