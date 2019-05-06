const [, , oper, ...nums] = process.argv

switch (oper) {
    case 'add':
        console.log(nums.reduce((accum, num) => accum + Number(num), 0))
        break
   
    case 'subs':
        console.log(nums.reduce((accum, num) => accum - Number(num)))
        break
    
    case 'mul':
        console.log(nums.reduce((accum, num) => accum * Number(num), 1))
        break
    case 'div':
    console.log(nums.reduce((accum, num) => accum / Number(num), 1))
    break
}
