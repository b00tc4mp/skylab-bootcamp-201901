const filter = require('./filter')

const { argv: [, , folder, ext]} = process

filter(folder, ext, (error, files) => {
    if(error) console.log(error)
     
    files.forEach(file => console.log(file))
})
