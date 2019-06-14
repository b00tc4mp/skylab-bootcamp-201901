// var fs = require('fs')
// var path = require('path')

// module.exports=  (folder, ext, callb) => {

//    fs.readdir(folder, (error, files) => {

//       if (error) return callb(error)  

//       const filtered = files.filter(file => path.extname(file) ===  `.${ext}`)
              
//       callb(undefined, filtered)

//       })
// }


const fs = require('fs')
const path = require('path')

module.exports = (folder, ext, cb) => {
    fs.readdir(folder, (error, files) => {
        if (error) return cb(error)
    
        const filtered = files.filter(file => path.extname(file) === `.${ext}`)

        cb(undefined, filtered)
    })
}