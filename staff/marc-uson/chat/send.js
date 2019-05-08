const http = require('http')

const{argv: [, , host, port, ...message]} = process




const data = message.join(' ')

const options = {
  hostname: `${host}`,
  port: port ,
  method: 'POST',
}

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', (d) => {
    process.stdout.write(d)
  })
})

req.on('error', (error) => {
  console.error(error)
})

req.write(data)
req.end()