// var http = require('http')

// var server = http.createServer(function (req, res) {
//   // manejar cada petición aquí.
// })
// server.listen(8000)

//ejerciio ejemplo


const http = require('http');

const fs = require('fs');

const puerto = Number(process.argv[2]);
const fileToServe = process.argv[3];

http.createServer(function procesar(req,resp){
    resp.writeHead(200,{'content-type':'text/plain'});
	fs.createReadStream(fileToServe).pipe(resp);
}).listen(puerto);