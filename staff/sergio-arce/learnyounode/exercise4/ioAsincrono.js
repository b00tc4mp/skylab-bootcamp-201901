
var fs = require('fs')

var filePath = process.argv[2]

fs.readFile(filePath, function callback(err, data) {
    if (err) { return err }

    var str = data.toString()
    var arr = str.split('\n')
    var res = arr.length-1
    console.log(res)
})

