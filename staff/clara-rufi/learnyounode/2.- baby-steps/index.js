
const { argv: [,, ...nums] } = process

const result = nums.reduce((accum, val) => accum + Number(val), 0)

console.log(result)



// const { argv } = process

// let result = 0

// for (i = 2; i < argv.length; i++) {
//     result += Number(argv[i])
// }

// console.log(result)


