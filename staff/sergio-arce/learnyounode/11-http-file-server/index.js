const http = require('http')
const fs = require('fs')

const { argv: [, , port, file] } = process

// const server = http.createServer((req, res) => {
//     fs.readFile(file, 'utf8', (err, content) => {
//         if (err) throw err
//         // res.write()
//         res.end(content)
//     })
// })

const server = http.createServer((req, res) => {
    const rs = fs.createReadStream(file)

    rs.pipe(res)
})


server.listen(port)