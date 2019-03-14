const http = require('http')
const url = require('url')
const logic = require('./logic')

const { argv: [, , port] } = process

http.createServer((req, res) => {
    if (req.url.startsWith('/api/')) {
        const parsedUrl = url.parse(req.url, true)

        const timestamp = parsedUrl.query.iso

        let response

        if (parsedUrl.pathname === '/api/unixtime') {
            response = {
                unixtime: logic.unixtime(timestamp)
            }
        } else if (parsedUrl.pathname === '/api/parsetime') {
            const { h: hour, m: minute, s: second } = logic.parsetime(timestamp)

            response = { hour, minute, second }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })

        res.end(JSON.stringify(response))
    }
}).listen(port)