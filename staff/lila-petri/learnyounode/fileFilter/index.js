var fs = require('fs') 
var path= require('path')

const [ , , url, extension]=process.argv
const ext = '.'+extension

fs.readdir(url, (error, list)=>{
    if(error) throw error
        list.forEach(e =>{
            if(path.extname(e)===ext){
                console.log(e)
            }})
    
})

