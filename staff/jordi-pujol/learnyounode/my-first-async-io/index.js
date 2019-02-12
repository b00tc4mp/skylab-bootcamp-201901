var fs = require('fs')


fs.readFile(process.argv[2], 'utf8' ,function (err, input){
    if (err) throw Error

    const numOfBreaks = input.match(/\n/g).length

    console.log(numOfBreaks)
})