const [,, ...nums]= process.argv
const numbers =  nums.map(x => +x )
 console.log(numbers.reduce((acc, num)=>acc+num))


