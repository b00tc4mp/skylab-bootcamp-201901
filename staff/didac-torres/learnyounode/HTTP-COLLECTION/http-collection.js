const [, , url] = process.argv
var http = require('http');
var bl = require('bl');

//OPTION "1"
http.get(url, function (response) {
    response.pipe(bl(function (err, data) {
        if (err) return console.log(err)
        data = data.toString()
        console.log(data.length)
        console.log(data)
    }))
})
