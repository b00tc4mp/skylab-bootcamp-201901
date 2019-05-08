const http = require('http')
const fs = require('fs')
const port = process.argv[2] // Puerto que usara como request
const filePath = process.argv[3] // path al objeto a compartir


const server = http.createServer((req, res) => { //Creo una constante que es un objeto servidor 

    const readStream = fs.createReadStream(filePath) //constante que coje el objeto
 
    readStream.on('open', function () { //Se asegura que el objeto es correcto antes de enviarlo por la pipa xD
        readStream.pipe(res); // lo enviamos como respuesta
      })

  })

  server.listen(port) // se llama a la funcion con el puerto que le llegue
