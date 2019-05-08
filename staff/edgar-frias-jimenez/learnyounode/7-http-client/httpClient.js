const httpClient = require('http')
const [, , url] = process.argv

httpClient.get(url, response => {
  response.setEncoding('utf8')
  response.on('error', err => { throw err })
  response.on('data', data => console.log(data))
})
