const numOfBreaksFromFileContent = require('./num-of-breaks-from-file-content')

const { argv: [, , path] } = process

numOfBreaksFromFileContent(path, (err, numOfBreaks) => {
    if (err) throw err

    console.log(numOfBreaks)
})
