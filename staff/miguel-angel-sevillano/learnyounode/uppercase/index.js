var map = require('through2-map')
var http = require('http')




var server = http.createServer(function (req, res) {

    if(req.method==='POST') {
    
        req.pipe(map(function (chunk) { //hace un map de la respuesta la convierte en string y a uppercasse
            return chunk.toString().toUpperCase()
          })).pipe(res) //envia el conteido por la respuesa 

            res.writeHead(200, "OK", {'Content-Type': 'text/plain' }) //el metodo de envio 
            
       
    }

})

server.listen(process.argv[2])




