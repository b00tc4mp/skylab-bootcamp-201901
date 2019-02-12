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

            var day = new Date(timestamp);

            const response = {
                hour: day.getHours(),
                minute: day.getMinutes(),
                second: day.getSeconds()
            }

            res.writeHead(200, { 'Content-Type': 'application/json' })

            res.end(JSON.stringify(response))
        }
    } 
}).listen(port)