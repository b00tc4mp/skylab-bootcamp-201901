const { argv } = process
var http = require('http')

http.get(argv[2], response => {
    let result = ''
    response.setEncoding("utf8").on('data', data => result += data)

    response.on('end', () => {
        console.log(result.length)
        console.log(result)
    })
})