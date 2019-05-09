const http = require('http')
const url = require('url')

const {argv: [ , ,port]} = process

const server = http.createServer((req, res) => {
  switch (url.parse(req.url).pathname){

    case '/api/parsetime':

      const date = new Date(url.parse(req.url, true).iso)

      resp = {
        "hour": date.getHours(),
        "minute": date.getMinutes(),
        "second": date.getSeconds()
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(resp))
      break

    case '/api/unixtime':

      const date2 = new Date(url.parse(req.url, true).iso)

      const resp = {
        unixtime: date2.getTime()
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(resp))
      break

    default:
    res.end('Incorrect path')

  }

})

server.listen(port)