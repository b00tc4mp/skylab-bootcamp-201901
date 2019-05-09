const fs = require('fs')

const { argv: [, , path] } = process

// fs.readFile(path, (error, content) => {
//     if (error) throw error

//     const lines = content.toString().match(/\n/g).length

//     console.log(lines)
// })

fs.readFile(path, 'utf8', (error, content) => {
    if (error) throw error

    const lines = content.match(/\n/g).length

    console.log(lines)
})