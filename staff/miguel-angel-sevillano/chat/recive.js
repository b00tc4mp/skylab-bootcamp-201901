var map = require('through2-map')
var http = require('http')




var server = http.createServer(function (req, res) {

    if(req.method==='POST') {
    
        res.writeHead(200, "OK", {'Content-Type': 'text/plain' }) 
        const ip = req.socket.remoteAddress;
    
        req.pipe(map(function (chunk) { 
            
            let message = {
                ip : ip,
                message : chunk.toString()
            }
            
                return  console.log(message)
          })).pipe(res) 

            
            
       
    }else throw error ("Only POST method please")

})

server.listen(8000,() =>{
    console.log("ON")
})