const http = require('http')

let server = http.createServer((req, res) => {

    let result = []

    if (req.method === 'POST') {
        req.on('data', chunk => {
            result.push(chunk)
        }).on('end', () => {
            result = Buffer.concat(result).toString().toUpperCase()
            res.end(result)
        })
    }
})
server.listen(process.argv[2])
