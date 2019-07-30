const http = require('http')
const url = require('url')

const { argv: [, , port] } = process

const apiToJSON = http.createServer((request, response) => {
  if(request.method !== 'GET') return response.end('I can only process GET requests')

  if(request.url.startsWith('/api/parsetime')) {
    const { query: { iso } } = url.parse(request.url, true)
    const date = new Date(iso)

    const resp = {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    }

    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(resp))

  } else if (request.url.startsWith('/api/unixtime')) {
      const { query: { iso } } = url.parse(request.url, true)
      const date = new Date(iso)

      const resp = {
        unixtime: date.getTime()
      }

      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(resp))
  } else response.end('Wrong request query')
})

apiToJSON.listen(port)
