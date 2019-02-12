const { argv: [,, ...nums] } = process

const result = nums.reduce((accum, val) => accum + Number(val), 0)

console.log(result)