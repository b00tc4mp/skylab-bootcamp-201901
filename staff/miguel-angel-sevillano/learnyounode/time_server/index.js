var strftime = require('strftime')
var net = require('net')


var server = net.createServer(function (socket) { //se crea el server
    
    
    
   
    socket.write(strftime('%F %R', new Date())) //en el socket se escribe  el strftime  y se cierra la conexion con el salto de linea
    socket.end('\n')
   
   
     
    
    })
     
     
     server.listen(process.argv[2])

    