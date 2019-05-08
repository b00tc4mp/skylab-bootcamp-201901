const http = require('http')
const fs = require('fs')

const { argv: [, , port, file] } = process

http.createServer((req, res) => {
    const rs = fs.createReadStream(file)
    
    // Show the same result but this method it's worse because use more memory with        huge files 
    // fs.readFile(file, 'utf8', (err, content) => {
    //     if(err) throw err
    //     res.end(content)
    // })

    res.writeHead(200, {'Content-Type': 'text/html'});
    
    rs.pipe(res)
}).listen(port)