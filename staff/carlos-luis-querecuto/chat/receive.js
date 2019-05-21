const http = require('http')

const { argv: [, , port] } = process

const server = http.createServer((req, res) => {
    let content = ''

    req.setEncoding('utf8')
    req.on('data', chunk => content += chunk)
    
    req.on('end', () => {
        const message = { ip:req.connection.remoteAddress , content  }
        res.writeHead(200, "OK", {'Content-Type': 'text/plain'})
        /* res.write(`${message.ip} : ${message.content}`) */
        res.end("Hacked!")
        return console.log(message)
    })
})

server.listen(port, () => console.log("chat running!"))