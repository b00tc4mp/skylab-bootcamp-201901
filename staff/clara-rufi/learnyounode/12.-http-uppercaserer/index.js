// For this lesson we need to create an HTTP server that only accepts POST requests.  
// The POST body should be converted to an uppercase string and returned to the client via the server response.  
// Like the previous lessons, the server should listen on the port provided as the first argument to the program 
// (process.argv[2]).


const http = require('http')

const { argv: [, , port] } = process

http.createServer((req, res) => {
    if (req.method === 'POST') {
        let content = ''

        req.on('data', data => content += data)

        req.on('end', () => res.end(content.toUpperCase()))
    } else res.end('cannot accept other method than POST')
}).listen(port)



/*
posem un debugger x saber q hi ha a la request

http.createserver((req, ser)) =>{}
debugger


a la consola:  exec req.method i obtnim 'GET

res.end =< quan s'acabi la resposta

node .8080






*/