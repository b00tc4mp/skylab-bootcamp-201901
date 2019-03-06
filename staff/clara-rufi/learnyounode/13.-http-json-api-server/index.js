// For the final lesson, we need to make a JSON API server that accepts a url query string that includes 
// an ISO time string. The server should respond with either an object that contains the hour, minute, and second, 
// or an object that contains the Unix epoch time depending on which endpoint is included in the url query string.


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
        } else res.end('TODO /api/parsetime')
    } else res.end('jajaja')
}).listen(port)


/* exec console.dir(req)
exec req.url
