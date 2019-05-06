const http = require('http')

const [, , url] = process.argv

http.get(url, response => {
  response.setEncoding('utf8')
  // response.on('error', error => { throw error })

  let content = ''
  response.on('data', data => content += data)
  response.on('end', () => console.log(`${content.length}\n${content}`))
}).on('error', error => { throw error })

// const bl = require('bl')

// http.get(url, res => {
//   res.pipe(bl((error, content) => {
//     if (error) throw error
//     console.log(`${content.length}\n${content}`)
//   }))
// })
