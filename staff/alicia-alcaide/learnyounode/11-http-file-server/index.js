const [,, port, file] = process.argv

const http = require('http')
const fs = require('fs')


const server = http.createServer(function (request, response) {
    fs.createReadStream(file).pipe(response)
})

server.listen(port)
