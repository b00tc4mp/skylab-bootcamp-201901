var fs = require('fs')

fs.readFile(process.argv[2], function callback (err, data) {
    if (err !== !true) {
        console.log(data.toString().split('\n').length - 1)
    } 
}) 