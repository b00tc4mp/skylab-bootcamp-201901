//send.js <host>:<port> "the message"
const http = require('http')
const [host, port] = process.argv[2].split(':') 
const message = process.argv[3]

// const data = JSON.stringify({
//     msg: message
// })

const options = { //opciones para enviar con http.request
    host: host,
    port: port,
    method: 'POST',
    headers: {
        // 'Content-Type': 'application/json',
        // 'Content-Length': data.length
        // 'Content-Length': message.length
    }
}

const req = http.request(options, (res) => { //lo activamos y decimos que queremos como repuesta 
    console.log(`statusCode: ${res.statusCode}`) // imprimeme el estatus
    res.on('data', (__data) => { // imprimeme el return del servidor
        process.stdout.write(__data)
    })
})


req.on('error', (error) => { // si error inprimelo
    console.error(error)
})

// req.end(data)

req.end(message) // se activa la request con el mensaje
