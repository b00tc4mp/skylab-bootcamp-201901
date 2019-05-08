// $ node calc mul 1 2 3 4 5

const [, , oper, ...nums] = process.argv

switch (oper) {
    case 'add':
        console.log(nums.reduce((accum, num) => Number(accum) + Number(num)))
        break
    case 'sub':
        console.log(nums.reduce((accum, num) => accum - num))
        break
    case 'mul':
        console.log(nums.reduce((accum, num) => accum * num))
        break
    case 'div':
        console.log(nums.reduce((accum, num) => accum / num))
}


