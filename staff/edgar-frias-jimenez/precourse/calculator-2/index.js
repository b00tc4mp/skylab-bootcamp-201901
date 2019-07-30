// Operands
const operands = document.querySelectorAll('.operands div');
let isOperandActivated = false;

// Modifier
const decimalButton = document.querySelector('.decimal');
let isNumberDecimal = false;

// Clear
const clearAllButton = document.querySelector('.clear-all');

// Equals
const equalsButton = document.querySelector('.equals');

// Display
const displayScreen = document.querySelector('.display');

// Numbers
const numbers = document.querySelectorAll('div[data-number]');

// Add the numbers into the display
for(let number of numbers) {
  number.addEventListener('click', (e) => {
    const el = e.target;
    const num = el.dataset.number;
    displayScreen.innerHTML += num;
    isOperandActivated = false;
  })
}

// Clears the display and the operation
clearAllButton.addEventListener('click', () => {
  displayScreen.innerHTML = '';
  isNumberDecimal = false;
});

// Put a decimal point in the current number
decimalButton.addEventListener('click', () => {
  if (isNumberDecimal === false) {
    if (displayScreen.innerHTML === '') {
      displayScreen.innerHTML += '0.';
    } else {
      displayScreen.innerHTML += '.';
    }
  }
  isNumberDecimal = true;
});

// Add the operands on the display
for(let operand of operands) {
  operand.addEventListener('click', (e) => {
    const operandType = e.target.classList.value;
    switch (operandType) {
      case 'division':
        if (isOperandActivated !== true) {
          displayScreen.innerHTML += '/';
          isOperandActivated = true;
        }
        break;
      case 'multiply':
        if (isOperandActivated !== true) {
          displayScreen.innerHTML += '*';
          isOperandActivated = true;
        }
        break;
      case 'subtraction':
        if (isOperandActivated !== true) {
          displayScreen.innerHTML += '-';
          isOperandActivated = true;
        }
        break;
      case 'summatory':
        if (isOperandActivated !== true) {
          displayScreen.innerHTML += '+';
          isOperandActivated = true;
        }
        break;
      default:
        console.log('Do nothing');
    }

    isNumberDecimal = false;
  });
}

// Set in the display the value of the operation shown
equalsButton.addEventListener('click', () => {
  if (displayScreen.innerHTML !== '') {
    const resultNumber = eval(displayScreen.innerHTML);
    if (resultNumber % 1 === 0) {
      displayScreen.innerHTML = resultNumber;
    } else {
      displayScreen.innerHTML = resultNumber.toFixed(3);
    }
  }
});
