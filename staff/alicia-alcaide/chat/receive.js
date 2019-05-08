// $ node receive.js <port>

const http = require('http')


let [, , port] = process.argv


const server = http.createServer(function (request, response) {
    if (request.method == 'POST') {
        let body = ''
        request.on('data', function (data) {
            body += data
        })
        request.on('end', function () {
            console.log(`${request.connection.remoteAddress}: ${body}`)
            response.writeHead(200, { 'Content-Type': 'text/plain' })
            response.end('post received')
        })
    }
})


server.listen(port, () => {console.log(`Listening in port: ${port}`)})


