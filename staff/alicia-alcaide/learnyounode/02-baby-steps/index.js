const [,, ...nums] = process.argv

console.log(nums.reduce((acum,num) => acum + Number(num),0))
