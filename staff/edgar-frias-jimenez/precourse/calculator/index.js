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

    results.push(`The summatory of ${newArgs} is: ${summatory % 1 !== 0 ? summatory.toFixed(3) : summatory},`);
    results.push(`the subtraction of ${newArgs} is: ${subtract % 1 !== 0 ? subtract.toFixed(3) : subtract},`);
    results.push(`the multiply of ${newArgs} is: ${multiply % 1 !== 0 ? multiply.toFixed(3) : multiply},`);
    results.push(`finally the division of ${newArgs} is: ${division % 1 !== 0 ? division.toFixed(3) : division}.`);

    console.log(results.join(' '));
  }
}
