const fs = require('fs')
const file = process.argv[2]

fs.readFile(file, function(error, content){
    if(error){
        return console.log('error')
    }
    let lines = content.toString().split('\n').length - 1
    console.log(lines)
}) 