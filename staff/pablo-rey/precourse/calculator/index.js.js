function doOperation(operation, numbers) {  
  let header;
  if (operation !== 'sqrt') {
    header = numbers.reduce((acc, item) => `${acc} ${operation} ${item}`);
  } else {
    header = `Square root of ${numbers[0]}`;
  }
  let resultOp;
  switch (operation) {
    case '+':
      resultOp = numbers.reduce((acc, item) => acc + item);
      break;
    case '-':
      resultOp = numbers.reduce((acc, item) => acc - item);
      break;
    case '*':
      resultOp = numbers.reduce((acc, item) => acc * item);
      break;
    case '/':
      resultOp = numbers.reduce((acc, item) => acc / item);
      break;
    case 'sqrt':
      resultOp = Math.sqrt(numbers[0]);      
      break;
  }
  return `${header} = ${Math.round(resultOp * 1000) / 1000}`;
}

function calculator(numbers) {
  const result = [];
  if (numbers.length === 1) {
    // Return only square root
    result[0] = doOperation('sqrt', numbers);
    return result;
  }
  result[0] = doOperation('+', numbers);
  result[1] = doOperation('-', numbers);
  result[2] = doOperation('*', numbers);
  result[3] = doOperation('/', numbers);
  return result;
}

function transformToNumber(str) {
  if (str.length === 0) {
    return '';
  }
  const regEx = /[^\d\.]/;
  if (regEx.test(str)) {
    return NaN;
  }
  return parseFloat(str);
}


let newNumbers;
do {
  let number;
  const numbers = [];
  do {
    number = transformToNumber(prompt(`We have now ${numbers}\nOne more number (empty to calculate): `));
    if (Number.isNaN(number)) {
      console.log('Not a number. Try again');
    } else if (number !== '') {
      numbers.push(number);
    }
  } while (number !== '');

  console.table(calculator(numbers));

  do {
    newNumbers = prompt('New numbers? (y/n) > ');
  } while (!/^(y|n)$/i.test(newNumbers));
} while (/^y$/i.test(newNumbers));
