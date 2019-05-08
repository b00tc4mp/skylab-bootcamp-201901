
const [,, ...num] = process.argv

console.log(num.reduce((acc, num) => Number(acc) + Number(num)))