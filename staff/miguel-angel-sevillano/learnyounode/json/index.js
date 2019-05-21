const http = require('http')
const url = require('url')

const { argv: [, , port] } = process

const server = http.createServer((req, res) => {
    if (req.method !== 'GET') return res.end('i can only process GET calls')

    if (req.url.startsWith('/api/parsetime')) { //comprueba que los path de las url empiezen por odnde se estipula
        const { query: { iso } } = url.parse(req.url, true) //recoge los datos que van en la url

        const date = new Date(iso)  //crea una clase Date con los parametros que obitne de la url mediante el parse

        const resp = {
            hour: date.getHours(), //formate la fecha para enviarla como objeto JSON
            minute: date.getMinutes(),
            second: date.getSeconds()
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(resp))
    } else if (req.url.startsWith('/api/unixtime')) {
        const { query: { iso } } = url.parse(req.url, true)

        const date = new Date(iso)

        const resp = {
            unixtime: date.getTime() //igual que antes pero con formato churro :)
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(resp))
    } else res.end('cannot understand this path')
})

server.listen(port) //el puerto donde trabajara nuestro server 