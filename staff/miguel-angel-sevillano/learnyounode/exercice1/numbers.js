


const[,,...args]=process.argv


console.log(args.reduce((acc,num)=> Number(acc)+Number(num)))

