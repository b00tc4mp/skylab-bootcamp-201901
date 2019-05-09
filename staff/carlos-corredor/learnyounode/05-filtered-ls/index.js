// versión 3 → utilizando el pathname sugerido en el hint del ejercicio
const fs = require('fs')
const path = require('path')
const extension = process.argv[3]
fs.readdir(process.argv[2], (error, file) => {
    if(error) throw error
    file.forEach(element => {
        if(path.extname(element) === `.${extension}`) console.log(element)
    })
})


// // versión 2 → generando un array final 'newArr' con todos los elementos que poseen extensión, incluyendo archivos ocultos (que comienzan por '.')
// const fs = require('fs')
// let extension = process.argv[3]
// fs.readdir(process.argv[2], (err, files) => {
//     let filtered = files.filter(word => word.lastIndexOf('.') !== -1)
//     let acc = 0
//     let newArr = filtered.map(function(x) {
//         let selected =''
//         if(x.lastIndexOf('.') !== x.length -1){
//             for (let i = x.lastIndexOf('.') + 1 ; i < x.length; i++) {
//                 selected += x[i]
//             }
//         }
//         return [selected, acc++]
//      })
//     newArr.forEach(element => {
//         if(element[0] === extension) console.log(filtered[element[1]])
//     })
// })

// // versión 1 → generando un array final 'newArr' con sólo los elementos que poseen extensión, es decir, sin incluir archivos ocultos (que comienzan por '.')
// const fs = require('fs')
// let extension = process.argv[3]
// fs.readdir(process.argv[2], (err, files) => {
//     let filtered = files.filter(word => word.lastIndexOf('.') !== -1)
//     let acc = 0
//     let newArr = filtered.map(function(x) {
//         let selected =''
//         if(x.lastIndexOf('.') && x.lastIndexOf('.') !== x.length -1){
//             for (let i = x.lastIndexOf('.') + 1 ; i < x.length; i++) {
//                 selected += x[i]
//             }
//         }
//         return [selected, acc++]
//      })
//     let file = newArr.filter(x => x[0].length)
//     file.forEach(element => {
//         if(element[0] === extension) console.log(filtered[element[1]])
//     })
// })
