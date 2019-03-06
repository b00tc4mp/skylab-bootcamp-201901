let mymodule = require('./module.js')

mymodule(process.argv[2], process.argv[3], function (err, input){

    if (err) throw err

    for (let i = 0; i < input.length; i++) {
        console.log(input[i])
    }
})