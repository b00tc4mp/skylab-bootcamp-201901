const https = require('http');
var bl = require('bl')



https.get(process.argv[2], function (response) {
    response.pipe(bl(function (err, data) { //get the buffer list info
        if (err)
            return console.error(err)
        data = data.toString()  //convert the data from bl to string
        console.log(data.length)
        console.log(data) //show data and data lentgh
    }))
})