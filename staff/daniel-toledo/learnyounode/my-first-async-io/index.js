const fs=require('fs')

const {argv:[,,path]} = process

fs.readFile(path, 'utf8', (error, data)=> {
    if (error) throw Error('Asyncron error')
    else console.log(data.split('\n').length-1)
})
