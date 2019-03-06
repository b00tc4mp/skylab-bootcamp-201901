const http = require('http')
const url = require('url')
const logic = require('./logic')

const { argv: [, , port] } = process

http.createServer((req, res) => {
    if (req.url.startsWith('/api')) {
        const parsedUrl = url.parse(req.url, true)
        const timestamp = parsedUrl.query.iso

        if (parsedUrl.pathname === '/api/unixtime') {

            const response = {
                unixtime: logic.unixtime(timestamp)
            }

            res.writeHead(200, { 'Content-Type': 'application/json' })

            res.end(JSON.stringify(response))

        } else if (parsedUrl.pathname === '/api/parsetime') {

            const { hour, minute, second } = logic.parsetime(timestamp)

            const response = { hour, minute, second }

            res.writeHead(200, { 'Content-Type': 'application/json' })

            res.end(JSON.stringify(response))

        }
    }


}).listen(port)

