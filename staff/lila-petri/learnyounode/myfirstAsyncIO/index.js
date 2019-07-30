var fs = require('fs') 

const [ , , url]=process.argv

fs.readFile(url, 'utf8', (error, data)=>{
    if(error===null){

        var array=data.split('\n')
        
        console.log(array.length-1)
    }

})

