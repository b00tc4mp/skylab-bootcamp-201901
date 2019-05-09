module.exports = function (url, extension, callback ) { 
    const fs = require('fs') 
    const path= require('path')
    let array=[]

    fs.readdir(url, function(err, list){
        if(err) return callback(err)
        list.forEach(e => {
            if(path.extname(e)===`.${extension}`)
                array.push(e)
        })
        return callback(null, array)
        }
    )
}  
