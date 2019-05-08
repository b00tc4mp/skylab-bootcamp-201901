const fs = require('fs')

console.log(process.argv)

const [,, pa, ext] = process.argv

const path = require('path') //modulo??

fs.readdir(pa, function(error, list){
    if(error) console.log(error)
    list.forEach(function(element){
        if(path.extname(element) === `.${ext}`){
            console.log(element)
        }
    })
})
