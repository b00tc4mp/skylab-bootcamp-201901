const url= require('url')
const http = require('http') 

const { argv: [, , port] } = process

const server = http.createServer(function(request, response) {
    if(request.method==='POST'){
        let body = [];
        request.on('error', (err) => {
            console.error(err);
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let ip= request.connection.remoteAddress.match(/(\d.*)/g).join('')
            console.log(`${ip} : ${body}`)
    }) 
}
response.end('ok');
})
server.listen(port)

