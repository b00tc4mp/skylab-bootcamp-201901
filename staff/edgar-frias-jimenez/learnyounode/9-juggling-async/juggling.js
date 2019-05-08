const http = require('http')
const { argv: [, , ...urls] } = process

const juggling = urls.map(url => new Promise((resolve, reject) => {
  http.get(url, response => {
    response.on('error', err => reject(err))
    response.setEncoding('utf8')
    let content
    response.on('data', data => {
      content = (content || '') + data
    })

    response.on('end', () => resolve(content))
  })
}))

Promise.all(juggling)
  .then(response => console.log(response))
