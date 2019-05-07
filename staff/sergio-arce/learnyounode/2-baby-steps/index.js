var res = process.argv.length
var sum = 0

for (var i = 2; i < res; i++) {
    var str = process.argv[i]
    var num = Number(str)
    sum = sum + num 
}
console.log(sum)
    