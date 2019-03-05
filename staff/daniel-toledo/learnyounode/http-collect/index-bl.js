const { argv: [, , url] } = process

var http = require('http')
const bl = require('bl')

http.get(url, response => {
    response.pipe(bl((error, content) => {
        if (error) throw error

        console.log(`${content.length}\n${content}`)
    }))

})