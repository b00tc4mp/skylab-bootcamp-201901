var http = require('http')

http.get(process.argv[2], (res) => {
    let result = ''
    res.setEncoding('utf8').on("data", (data) => result += data)
    res.on("end", () => {
        var num = result.split('').length
        console.log(`${num}\n${result}`)
    })
})