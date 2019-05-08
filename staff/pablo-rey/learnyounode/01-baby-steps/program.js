const numbers = process.argv.slice(2).map(item => Number(item));

console.log(numbers.reduce((acc, num) => acc + num));