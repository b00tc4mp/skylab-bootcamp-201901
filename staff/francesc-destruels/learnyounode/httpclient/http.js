const http = require('http')
const url = process.argv[2] //Extraemos la url

http.get(url, response => {
    response.setEncoding("utf8")
    response.on("data", data => {

        console.log(data) // pintamos la data recivida

    })
})
