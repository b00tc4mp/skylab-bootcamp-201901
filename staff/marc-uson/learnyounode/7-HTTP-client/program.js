var http = require('http')

const [,,url] = process.argv

http.get(url, (response) => {
    response.setEncoding('utf8')

    response.on('data', (data) => {
        console.log(data)
    })
})