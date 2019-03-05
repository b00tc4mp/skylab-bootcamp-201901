var mymodule = require('./module')

mymodule(process.argv[2], process.argv[3], (err, list) => {
    if (!err) list.forEach(e => console.log(e))
    console.error(err)
})