const {argv:[,,dir, extension]} = process

const fs=require('fs')
const path=require('path')

fs.readdir(dir, (error, list)=>{
    if (!error) list.filter(file => (path.extname(file)===('.'+extension))).forEach(wantedFile=>console.log(wantedFile))
    else console.error(error)
})