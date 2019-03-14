const http = require('http')
const fs = require('fs')

const { argv: [, , port, file] } = process

http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' })
    // res.writeHead(200, { 'content-type': 'text/plain' })

    const rs = fs.createReadStream(file)

    // rs.on('open', () => rs.pipe(res))
    rs.pipe(res)
})
    .listen(port)