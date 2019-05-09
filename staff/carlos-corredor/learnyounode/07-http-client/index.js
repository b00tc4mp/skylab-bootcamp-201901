const http = require('http')
const url = process.argv[2]

http.get(url, (res)=>{
    res.setEncoding('utf8')
    res.on("error", function (error) {console.error(error)})
    res.on("data", function (data) {console.log(data)})
    res.on("end", function () { console.log('') })
})
