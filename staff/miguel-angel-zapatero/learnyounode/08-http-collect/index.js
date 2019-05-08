const http = require('http')

const { argv: [, , url]} = process

http.get(url, response => {
    response.setEncoding('utf8')
    response.on('error', error => {throw error})
    content = ''
    response.on('data', data => content += data)
    response.on('end', () => console.log(`${content.length}\n${content}`))
})

//Third-party package bl(Buffer List) or concat-stream
// http.get(url, res => {

//     res.pipe(bl((error, content) => {
//         if (error) throw error

//         console.log(`${content.length}\n${content}`)
//     }))
// })