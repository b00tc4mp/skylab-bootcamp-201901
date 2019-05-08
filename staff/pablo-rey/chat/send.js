const http = require('http');

const [host, port] = process.argv[2].split(':');

const data = process.argv[3];

const options = {
  hostname: host,
  port: port,
  path: '/',
  method: 'POST',
}

const req = http.request(options, (res) => {
  const result = '';
  res.on('data', (d) => {
    debugger
    console.log(d.toString());
  })
  
})

req.on('error', (error) => {
  console.error(error)
})

req.write(data)
req.end()