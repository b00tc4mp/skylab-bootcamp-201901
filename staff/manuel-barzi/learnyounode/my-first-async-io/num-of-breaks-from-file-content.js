const fs = require('fs')

function numOfBreaksFromFileContent(filePath, callback) {
    fs.readFile(filePath, { encoding: 'utf-8' }, (error, content) => {
        if (error) return callback(error)
    
        const numOfBreaks = content.match(new RegExp('\n', 'g')).length

        callback(null, numOfBreaks)
    })
}

module.exports = numOfBreaksFromFileContent