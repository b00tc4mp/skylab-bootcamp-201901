// $ node send.js <host>:<port> "the message"

var http = require('http')

const { argv: [, , ipAndPort, messageToSend] } = process

cont [ipSend, portSend] = ipAndPort.split(':')

//const ipSend = ipAndPort.split(':')[0]
//const portSend = ipAndPort.split(':')[1]


const options = {
    hostname: ipSend,
    port: portSend,
    path: '/',
    method: 'POST'
    //No hace falta pq son los valores por defecto 
    //(ojo!!! que esta longitud son bites y el acento ocupa sitio, no se puede hacer .length)
    /* headers: {
        'Content-Type': 'text/plain',
        'Content-Length': messageToSend.length
    } */
}

const req = http.request(options, (res) => {
    res.setEncoding('utf8')

    res.on('data', (data) => {
        console.log(data)
    })
})

req.on('error', (error) => {
    console.error(error)
})

req.write(messageToSend)
req.end()  