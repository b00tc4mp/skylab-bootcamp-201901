const http = require('http')

const { argv: [, , url] } = process

http.get(url, response => {
  response.setEncoding('utf8')
  response.on('error', error => { throw error })

  let content = ''
  response.on('data', data => content += data)
  response.on('end', () => console.log(`${content.length}\n${content}`))
})
