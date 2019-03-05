const { argv: [,,a]} = process

myFunc = process.argv.slice(2).reduce((acc, curr) => Number(acc) + Number(curr))

console.log(myFunc)
