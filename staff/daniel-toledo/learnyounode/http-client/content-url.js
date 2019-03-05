const http = require('http')

module.exports= (url, callback)=> {
    http.get(url, response => {
        response.setEncoding("utf8").on('data', data => callback(null,data))
        response.on('error', error => callback(error))
    })
}

