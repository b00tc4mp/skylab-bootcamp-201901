const fs = require('fs')

const { argv: [, , path] } = process

fs.readFile(path, { encoding: 'utf-8' }, (error, content) => {
    if (error) throw error

    const numOfBreaks = content.match(new RegExp('\n', 'g')).length
    
    console.log(numOfBreaks)
})
