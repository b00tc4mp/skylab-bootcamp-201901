const [,, oper , ...nums] = process.argv
//node calc mul 1 2 3 4 5



switch (oper) {
     case 'mul':
    console.log(nums.reduce((accum, num) => accum + Number(num), 0))
    case 'div':
    console.log(nums.reduce((accum, num) => accum * Number(num), 0))
}

