const [,,...num]= process.argv

console.log(num.reduce((acum, num)=>acum + Number(num), 0))