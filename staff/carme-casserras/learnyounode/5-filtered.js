var fs = require('fs')
var path = require('path')

// const [, , folder, ext]  = process.argv

fs.readdir(process.argv[2], function(error, list) {
   
   if (error) throw error

      list.forEach(eleTxt => path.extname(eleTxt) === `.${process.argv[3]}` && console.log(eleTxt))

      //   if (path.extname(eleTxt) === `.${process.argv[3]}`){
            // eleFiltered = list.filter(function(eleTxt){
               // console.log(eleTxt)
 
 
})


