var fs = require('fs')

const buf = fs.readFile(process.argv[2], 'utf8', function(error, data) {
    if (error) console.log(error)
    
    else {
        const str = data.toString().split('\n').length-1
        console.log(str)
    }
}) 

