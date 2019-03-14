const http = require('http')

const { argv: [, , port] } = process

http.createServer((req, res) => {
    if (req.url.startsWith('/api/')) {
        const [path, query] = req.url.split('?')
        const [, timestamp] = query.split('=')

        if (path === '/api/unixtime') {
            const response = {
                unixtime: new Date(timestamp).getTime()
            }

            res.writeHead(200, { 'Content-Type': 'application/json' })

            res.end(JSON.stringify(response))
        } else {

            const date = new Date(timestamp)

            const response = {
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds()
            }

            res.writeHead(200, { 'Content-Type': 'application/json' })

            res.end(JSON.stringify(response))
        }

    } else res.end('jajaja')
}).listen(port)