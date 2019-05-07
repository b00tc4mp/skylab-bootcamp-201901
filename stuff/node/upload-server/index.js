const http = require('http')
const fs = require('fs')

const { argv: [, , port, file] } = process

const server = http.createServer((req, res) => {
    const ws = fs.createWriteStream(file)

    ws.on('error', err => { debugger })

    req.on('end', () => res.end('ok'))

    req.pipe(ws)
})


server.listen(port)