const http = require('http')
const url = require('url')

const { argv: [, , port] } = process

const server = http.createServer((req, res) => {
    if(req.method !== 'GET') {
        res.end('only GET calls')
    }

    const { pathname } = url.parse(req.url, true)
    
    if (pathname === '/api/parsetime') {
        const { query: { iso } } = url.parse(req.url, true)

        const date = new Date(iso)

        const resp = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(resp))
    } else if (pathname === '/api/unixtime') {
        const { query: { iso } } = url.parse(req.url, true)

        const date = new Date(iso)

        const resp = {
            unixtime: date.getTime()
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(resp))
    } else res.end('not an api request')
})

server.listen(port)