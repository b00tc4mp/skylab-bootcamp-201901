


const net = require ('net')

const {argv: [, , port]} = process

net.createServer(conn => conn.on('data', data => {
    console.log(data.toString())

    conn.end('OK')
})
).listen(port)