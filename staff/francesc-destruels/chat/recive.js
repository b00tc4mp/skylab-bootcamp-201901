// node receive.js <port> <ip-address>: "the message" ip request#.remoteadress
const http = require('http')
const map = require('through2-map') 

const port = process.argv[2]

const server = http.createServer((req, res) => { // creamos un server que no es mas algo que pilla una request y emite una respuesta
    if (req.method !== 'POST') res.end('POST or nothing')

    req.pipe(map(function (chunk) {
        let message = chunk.toString()
        let ip = req.connection.remoteAddress.match(/(\d.*)/g).join("")
        // console.log(`${ip}: ${JSON.parse(message).msg}`)
        console.log(`${ip}: ${message}`)
        return (`${ip}: ${message}`)
    })).pipe(res)

})

server.listen(port)