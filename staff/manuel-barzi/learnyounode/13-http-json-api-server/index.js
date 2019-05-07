const http = require('http')
const url = require('url')

const { argv: [, , port] } = process

const server = http.createServer((req, res) => {
    if (req.method !== 'GET') return res.end('i can only process GET calls')

    if (req.url.startsWith('/api/parsetime')) {
        const { query: { iso } } = url.parse(req.url, true)

        const date = new Date(iso)

        const resp = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(resp))
    } else if (req.url.startsWith('/api/unixtime')) {
        const { query: { iso } } = url.parse(req.url, true)

        const date = new Date(iso)

        const resp = {
            unixtime: date.getTime()
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(resp))
    } else res.end('cannot understand this path')
})

server.listen(port)