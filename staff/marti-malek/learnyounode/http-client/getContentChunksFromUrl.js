var http = require('http')

function getContentChunksFromUrl(url, callback) {
    http.get(url, res => res.setEncoding('utf8')
        .on("data", chunk => callback(null, chunk)))
        .on('error', error => callback(error))
}

module.exports = getContentChunksFromUrl