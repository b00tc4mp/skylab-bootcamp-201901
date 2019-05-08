const http = require('http')

const { argv: [, , url, port, message] } = process

const options = {
  host: url,
  method: 'POST',
  port: port
}

const send = http.request(options, response => {
  if(request.method !== 'POST') return response.end('Sorry the used method is not valid')
  request.on('data', chunk => console.log('chunk', chunk))
})

send.on('error', error => console.error(error))
send.write(message)
send.end()
