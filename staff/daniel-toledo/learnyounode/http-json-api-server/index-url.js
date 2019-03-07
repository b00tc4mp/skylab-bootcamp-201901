const http = require('http')
const url=require('url')

const { argv: [, , port] } = process

http.createServer((req, res) => {
    if (req.url.startsWith('/api')){
        const parsedUrl =url.parse(req.url, true)
        const timestamp =parsedUrl.query.iso

        const date = new Date(timestamp)
    
        if (parsedUrl.pathname === '/api/unixtime') {

            const response = {
                unixtime: date.getTime()
            }
    
            res.writeHead(200, { 'Content-Type': 'application/json' })
    
            res.end(JSON.stringify(response))

        }  else if (parsedUrl.pathname === '/api/parsetime'){

            const response = {
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds()
            }
    
            res.writeHead(200, { 'Content-Type': 'application/json' })
    
            res.end(JSON.stringify(response))  

        } else res.end('jajaja')
    } else res.end('jajaja')


}).listen(port)