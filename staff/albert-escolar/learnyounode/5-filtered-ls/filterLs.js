const fs = require('fs')
const[,,path,extension] = process.argv

fs.readdir(path, (error, files)=>{
    if(error)console.error(error)
    const filterDone = files.filter(file=>file.includes(`.${extension}`))
    filterDone.forEach(element=>console.log(element))
})

