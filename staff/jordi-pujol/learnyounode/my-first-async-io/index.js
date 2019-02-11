var fs = require('fs')


let buf = fs.readFile(process.argv[2], 'utf8' ,function (err, input){
    if (err) throw Error
    console.log((input.split('\n')).length -1)
})
