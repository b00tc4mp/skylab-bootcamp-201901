const [,, url] = process.argv

const http = require('http')


http.get(url, function(response) {
    response.setEncoding('utf8')

    response.on('error', error => { throw error })

    //response.on('data', function(data) { console.log(data) })
    response.on('data', data => { console.log(data) })
})

// Opción 2
/*
http.get(url, function(response) {
    return response.on('data', function(data) { console.log(data.toString()) })
})
*/
