/*This lesson requires that we use the fs.createReadStream() method to stream the file contents to our server’s 
response rather than using the fs.readFile() method.  What’s the difference?  The fs.readFile() method will read 
the entire file into memory before sending it to the response, while the fs.createReadStream() method will stream 
the file contents to the response as it is read.  This may be faster in some cases, and use less memory.*/ 

const http = require('http')
const fs = require('fs')

const { argv: [, , port, file] } = process

http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' })
    // res.writeHead(200, { 'content-type': 'text/plain' })

    const rs = fs.createReadStream(file) // allows you to open up a readable stream in a very simple manner. 
    //All you have to do is pass the path of the file to start streaming in. It turns out that the response 
    //(as well as the request) objects are streams. So we will use this fact to create a http server that streams 
    //the files to the client. 

    // rs.on('open', () => rs.pipe(res))
    rs.pipe(res)
})
    .listen(port)


/* fem servidor i el posem a escoltar. donar resposta cada vegada q hi ha conexio, la resposta l'empipem
rs.open (quan esta obert)
rep es el q ens envia el client, el html

cd ttp-file-server

node .8080 ./index.html   (per carregar el html q hem creat)

*/