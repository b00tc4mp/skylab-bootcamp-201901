const [, , ...nums] = process.argv

console.log(nums.reduce((acc, num) => Number(acc) + Number(num)))