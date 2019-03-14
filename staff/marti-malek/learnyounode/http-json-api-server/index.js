const http = require('http')
const logic = require('./logic')

http.createServer((req, res) => {

    
    const [path, query] = req.url.split('?')
    const [, timestamp] = query.split('=')
    let response
    debugger

    if (path === '/api/parsetime') {
        debugger
        const {h:hour, m:minute, s:second} = logic.parsetime(timestamp)
        response = {
            hour,
            minute,
            second
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(response))
    }
    if (path === '/api/unixtime') {
        debugger

        response = {
            unixtime: logic.unixtime(timestamp)
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(response))
    } else res.end()
    res.end()
}).listen(process.argv[2])