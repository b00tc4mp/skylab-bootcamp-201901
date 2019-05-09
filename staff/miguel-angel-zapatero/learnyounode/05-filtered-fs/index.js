const fs = require('fs')
const path = require('path')

const {argv: [, , folder, ext]} =  process

fs.readdir(folder, (err, data) => {
    if(err) throw err

    data.filter(file => path.extname(file) === `.${ext}` && console.log(file))
})