let historial = '';
let lastButton;
let numbers = [];
let operations = [];
const operButtons = ['+','-','*','/','='];

function addNumber(value) {
    let elem = document.getElementById('result');
    let num = elem.textContent;
    if (num === '0' || num === '-0' || findButton()) {
        num = value;
        lastButton = value;
    } else {
        num += value;
    }
    elem.innerHTML = num;
}

function deleteNumber() {
    document.getElementById('result').innerHTML = 0;
}

function deleteAll() {
    numbers = [];
    operations = [];
    historial = '';
    document.getElementById('caption').innerHTML = historial;
    document.getElementById('result').innerHTML = 0;
}

function changeSign() {
    let elem = document.getElementById('result');
    let num = elem.textContent;
    if (num.includes('-')) {
        elem.innerHTML = num.substring(1,num.length);
    } else {
        elem.innerHTML = '-' + num;
    }
}

function goBack() {
    let elem = document.getElementById('result');
    let num = elem.textContent;
    if (!findButton()) {
        if (num.length > 1) {
            elem.innerHTML = num.slice(0, -1);
            if (elem.textContent.length === 1 && num.includes('-')) {
                elem.innerHTML = 0;
            }
        } else {
            elem.innerHTML = 0;
        }
    }
}

function addComma(value) {
    let num;
    if (findButton()) {
        num = '0';
    } else {
        num = document.getElementById('result').textContent;
    }
    
    if (!findComma(num)) {
        num += value;
        lastButton = value;
    }
    document.getElementById('result').innerHTML = num;
}

function findComma(str) {
    return str.includes('.');
}

function findButton() {
    return operButtons.includes(lastButton);
}

function safeNum(symbol) {
    let num = document.getElementById('result').textContent;
    numbers.push(num);
    operations.push(symbol);
    if (symbol === '*') {
        historial += num + ' x ';    
    } else {
        historial += num + ' ' + symbol + ' ';
    }
    document.getElementById('caption').innerHTML = historial;
    lastButton = symbol;
}

// Función para hacer la suma más exacta.
function findMaxDecimal() {
    let arr = numbers.map(function(elem){
        let num = 0;
        if (findComma(elem)) {
            num = elem.substring(elem.indexOf('.') + 1, elem.length).length;
        }
        return num;
    });
    return Math.max(...arr);
}

// arreglar función resultado para que muestre todos los campos correctamente. Result, caption, etc...
function result() {
    if (operations.length !== 0) {
        let num = document.getElementById('result').textContent;
        numbers.push(num);
        historial += num;

        let result = numbers.reduce(function(acc, cur){
            let symbol = operations.shift();
            let numAcc = findComma(acc) ? Number.parseFloat(acc) : Number.parseInt(acc);
            let numCur = findComma(cur) ? Number.parseFloat(cur) : Number.parseInt(cur);
            let result;
            let maxDecimals = findMaxDecimal(); //Para ajustar los decimales en sumas y restas
            switch(symbol) {
                case '+':
                    result = (numAcc + numCur).toFixed(maxDecimals);
                    break;
                case '*':
                    result = numAcc * numCur;
                    break;
                case '-':
                    result = (numAcc - numCur).toFixed(maxDecimals);
                    break;
                case '/':
                    result = numAcc / numCur;
                    break;
                default:
                    result = 0;
            }
            return result.toString();
        });

        document.getElementById('result').innerHTML = result;
        document.getElementById('caption').innerHTML = historial;
        historial = '';
        numbers = [];
        lastButton = '=';
    }
}

function bindingKeys(event) {
    var x = event.charCode || event.keyCode;
    var key = event.key;
    console.log(x + ' - ' + key);
    if (x >= 48 && x <= 57) {
        if (key === '=') {
            result();
        } else if (key === '/') {
            safeNum(key);
        } else {
            addNumber(key);
        }

    }

    switch(x) {
        case 8:
            goBack();
            break;
        case 13:
            result();
            document.getElementById('igual').focus();
            break;
        case 46:
            deleteAll();
            break;
        case 67:
            deleteNumber();
            break;
        case 187:
            safeNum(key);
            break;
        case 189:
            if (key === '-') {
                safeNum(key);
            }
            break;
        case 190:
            if(key === '.') {
                addComma(key);
            }
            break;
        default:
            break;
    }
}