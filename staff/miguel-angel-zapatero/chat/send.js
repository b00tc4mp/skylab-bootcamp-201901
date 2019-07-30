const http = require('http')

const { argv: [, , host, msg] } = process
const [ip, port] = host.split(':') //[192.168.x.x, 8080] = '192.168.x.x:8080'

// const data = JSON.stringify({
//     msg: msg
// })

const options = {
    hostname: ip,
    port: port,
    method: 'POST',
    // headers: {
    //     'Content-Type': 'application/json',
    //     'Content-Length': data.length
    //     }
}

const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    
    res.setEncoding('utf8')
    res.on('error', error => console.log(error))
    
    let content = ''
    res.on('data', chunk => content += chunk)
    res.on('end', () => console.log(content))
})

// req.end(data)  -> para objetos
req.end(msg)