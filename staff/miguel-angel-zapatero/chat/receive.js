const http = require('http')

const { argv: [, , port] } = process

const server = http.createServer((req, res) => {
    const ip = req.connection.remoteAddress.match(/\d.*/).join()
    
    if(req.method !== 'POST') {
        res.writeHead(400);
        res.end('only POST calls')
    }
    else {         
        req.setEncoding('utf8')
        req.on('error', error => console.log(error))

        let content = ''
        req.on('data', chunk => content += chunk)
        req.on('end', () => {
            content += '\n'
            console.log(`${ip} - ${content}`)
            
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('ok')
        })
    }
})

server.listen(port)