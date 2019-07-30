const [,,...nums] = process.argv
console.log(nums.reduce((acum, num) => (Number(acum) + Number(num))))