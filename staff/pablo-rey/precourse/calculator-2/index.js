const maxDisplayLength = 9;
let currentOperation = '';
let previousValue = null;
let displayString = '0';
const displayValue = () => (displayString.includes('.') ? Number.parseFloat(displayString) : Number.parseInt(displayString));

function setDisplayValue (value) {
  displayString = `${value}`;
  displayString = (displayString.length > maxDisplayLength && !displayString.includes('.')) ? 'overflow' : displayString.slice(0, maxDisplayLength);
}

function setCurrentOperation(op) {
  currentOperation = op;
  const faIcon = {'+': 'fa-plus','-':'fa-minus', '*': 'fa-times', '/': 'fa-divide'};
  document.getElementById('previousDisplay').innerHTML = (op === '') ? '' : `${previousValue} ${op}`;
  document.getElementById('currentOperation').innerHTML = (op === '') ? '' : `<i class="fas ${faIcon[op]}"></i>`;
  document.getElementById('currentOperation').style.backgroundColor = (op === '') ? '' : '#00ee00';
  document.getElementById('resultFlag').style.backgroundColor = (op === '') ? '#00ee00' : '';
}

function keypress(event) {
  let char = String.fromCharCode(event.charCode);
  if (/[+\-*/]/.test(char)) {
    clickBinaryOp(char);
  } else if (/[\d\.]/.test(char)) {
    clickFigure(char);
  }
}

function keydown(event) {
  if (event.keyCode === 13) {
    clickUnaryOp('=');
  } else if (event.keyCode === 8) {
    clickUnaryOp('backspace');
  } else if (event.keyCode === 27) {
    clickUnaryOp('C');
  }
}

function clickFigure(figure) {
  displayString = Number.isNaN(displayValue()) ? '' : displayString;
  displayString = displayString === '0' ? '' : displayString;
  figure = (figure === '.' && displayString.includes('.')) ? '' : figure;
  displayString += figure;
  displayString = (displayString === '.') ? '0.' : displayString.slice(0, maxDisplayLength);
  document.getElementById('resultFlag').style.backgroundColor = "";
  document.getElementById('display').innerHTML = displayString;
}

function clickBinaryOp(op) {
  if (Number.isNaN(displayValue())) {
    return;
  }
  if (currentOperation !== '') {
    resolve();
  }
  previousValue = displayValue();
  displayString = '0';
  setCurrentOperation(op);
}

function resolve() {
  let result = displayValue();
  switch (currentOperation){
    case '+':
      result = previousValue + displayValue();
      break;
    case '-':
      result = previousValue - displayValue();
      break;    
    case '*':
      result = previousValue * displayValue();
      break;
    case '/':
      result = previousValue / displayValue();
      break;
  }
  setDisplayValue(result);
  setCurrentOperation('');
}

function clickUnaryOp(op) {
  displayString = Number.isNaN(displayValue()) ? '0' : displayString;
  switch (op) {
    case 'C':
      setCurrentOperation('');
    case 'CE':
      displayString = '0';
      break;
    case '+-':
      setDisplayValue(-displayValue());
      break;
    case 'backspace':      
      displayString = displayString.length === 1 ? '0' : displayString.slice(0,displayString.length-1);
      displayString = (displayString === '-') ? '0' : displayString;
      break;
    case "sqrt":
      setDisplayValue(Math.sqrt(displayValue()));
      break;
    case "^2":
      setDisplayValue(Math.pow(displayValue(), 2));
      break;
    case "=":
      resolve();
      break;       
    case "%":
      resolve();
      setDisplayValue(displayValue() / 100);
      break;        
  }
  document.getElementById('display').innerHTML = displayString;
}