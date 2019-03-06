const fs=require('fs')

module.exports = (url, callback) => fs.readFile(url, 'utf8', (error, string) => {
    if (error) return callback(error)

    else return callback(null, string.match(/\n/g) ? string.match(/\n/g).length : 0)
})
