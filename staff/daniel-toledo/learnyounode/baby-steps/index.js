const { argv} = process

let numbers=argv.slice(2)
let sum=numbers.reduce((accumulator, currentValue)=>Number(accumulator)+Number(currentValue))

console.log(sum)
