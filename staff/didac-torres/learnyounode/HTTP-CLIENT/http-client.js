const [, , url] = process.argv
var http = require('http');

//OPTION "1"
http.get(url, function (response) {
    return response.on("data", function (data) { console.log(data.toString()) })
})

//OPTION "2"
// http.get(url, function (response) {
//     response.setEncoding('utf8')
//     return response.on("data", function (data) { console.log(data)})
// })
