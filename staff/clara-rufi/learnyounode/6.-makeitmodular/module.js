var fs = require('fs')
var path = require('path')


fs.readdir(process.argv[2], process.argv[3], (error, list) => {
    if (error) console.error(error)
    else {
        let filterList=list.filter(document => path.extname(document) === '.' + process.argv[3])
        filterList.forEach(filteredDocument=>console.log(filteredDocument)) 
    }
})


let moduleList= list.forEach(iteratorList => console.log(path.extname(iteratorList) + '.' + process.argv[3]))
console.log(moduleList)