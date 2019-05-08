let mymodule = require('./mymodule')
const [,,url, extension]=process.argv


const callback = (error, data)=>{
    if (error) throw error
    data.forEach(element => {
        console.log(element)
    })
}

mymodule(url, extension, callback)

