const [, , ...nums] = process.argv

console.log(nums.reduce((accum, num) => accum + Number(num), 0))