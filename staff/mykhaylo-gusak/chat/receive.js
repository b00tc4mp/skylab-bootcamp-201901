// $ node receive.js <port>
// 192.168.0.15:8080

const http = require('http')

const { argv: [, , port] } = process

const server = http.createServer((req, res) => {
    if (req.method !== 'POST') return res.end('Use POST')
    req.setEncoding('utf8')


    req.on('data', chunk =>  {
        let respObj = JSON.parse(chunk)
        const {name,message} = respObj
        let showMessage = `Name: ${name}| message: ${message}`
        console.log(showMessage)
        res.end("OK")
    })
})

server.listen(port)