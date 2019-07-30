// Project 1 - Calculator
const calculator = (...newArgs) => {
  let results = [];
  let isInvalid = false;

  for (let i = 0; i < newArgs.length; i++) {
    if (typeof newArgs[i] !== 'number' || newArgs[i] === null || newArgs[i] === undefined) {
      isInvalid = true;
    }
  }

  if (newArgs.length === 1 && isInvalid) {
    console.log('Sorry you entered an invalid input');
  } else if (newArgs.length === 1 && !isInvalid) {
    const oneParamResult = Math.sqrt(newArgs[0]);
    console.log(`As you only entered one input I can only give the square root of ${newArgs[0]}, that is: ${oneParamResult % 1 !== 0 ? oneParamResult.toFixed(3) : oneParamResult}`);
  } else {
    const summatory = newArgs.reduce((a, b) => a + b);
    const subtract = newArgs.reduce((a, b) => a - b);
    const multiply = newArgs.reduce((a, b) => a * b);
    const division = newArgs.reduce((a, b) => a / b);

    const floatValue = (operand) => {
      return operand % 1 !== 0 ? operand.toFixed(3) : operand;
    }

    results.push(`The summatory of ${newArgs} is: ${floatValue(summatory)},`);
    results.push(`the subtraction of ${newArgs} is: ${floatValue(subtract)},`);
    results.push(`the multiply of ${newArgs} is: ${floatValue(multiply)},`);
    results.push(`finally the division of ${newArgs} is: ${floatValue(division)}.`);

    console.log(results.join(' '));
  }
}
