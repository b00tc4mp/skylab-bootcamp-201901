const http = require('http')
const map = require('through2-map')
const port = process.argv[2] // Puerto que usara como request


const server = http.createServer((req, res) => { //Creo una constante que es un objeto servidor 
    if (req.method === 'POST') { // si el request is not a POST bye bye
        req.pipe(map(function (chunk) { // then we use the throught2-map
            return chunk.toString().toUpperCase()
        })).pipe(res)

    } else  return res.end('Post or nothing') // AL no ser post acabamos la conexion
})

server.listen(port) // se llama a la funcion con el puerto que le llegue
