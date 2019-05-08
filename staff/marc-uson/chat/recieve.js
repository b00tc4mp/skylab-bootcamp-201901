const http = require('http')

const{argv: [, , port]} = process

http.createServer((req,res) =>{
    if(req.method === 'POST'){
        let data = []
        req.on('data', chunk => {
            data.push(chunk)
        })
        req.on('end', () => {
            let ip = req.connection.remoteAddress.match(/(\d.*)/g).join('')
            console.log(`${ip}: ${data.toString()}`)
        })
        res.end('Recieved')
    }else{
        res.end('not a valid method')
    }

}).listen(port)