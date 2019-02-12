const {argv} = process

const fs=require('fs')
const buffer=fs.readFile(argv[2], 'utf8', (error, data)=> {
    if (error) throw Error('Asyncron error')
    else console.log(data.split('\n').length-1)
})
