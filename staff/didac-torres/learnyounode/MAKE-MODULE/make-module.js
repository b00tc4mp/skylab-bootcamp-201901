var searchExt = require('./my-module')


const [,,dir,ext]= process.argv

let callback= function(error, data){
    if (error) console.log(error)
data.forEach(element => {
        console.log(element)
    });
}

searchExt(dir, ext, callback)




