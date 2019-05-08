var http = require('http')
var bl = require('bl')

const [,,url] = process.argv

http.get(url, (response) => {
    response.pipe(bl(function (err, data) { 
        if (err!= null) console.log(err)
        data = data.toString()
        console.log(data.length)
        console.log(data)
    }))

})
