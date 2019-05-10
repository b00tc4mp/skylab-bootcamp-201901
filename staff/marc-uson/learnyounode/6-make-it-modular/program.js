var mymodule = require('./mymodule');

const[,, directory, extension] = process.argv

var callback =  (error, element) => {
    if (error)  throw error
    element.forEach(e =>{
        console.log(e)
    })
}

mymodule(directory, extension, callback);