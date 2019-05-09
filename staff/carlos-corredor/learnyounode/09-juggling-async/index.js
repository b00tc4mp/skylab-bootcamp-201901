const http = require('http')
const url1 = process.argv[2]
const url2 = process.argv[3]
const url3 = process.argv[4]

http.get(url1, (res)=>{
    res.setEncoding('utf8')
    res.on("error", function (error) {console.error(error)})
    let content = ''
    res.on("data", function (data) {content += data})
    res.on("end", function () {
        console.log(content)
        http.get(url2, (res)=>{
            res.setEncoding('utf8')
            res.on("error", function (error) {console.error(error)})
            let content = ''
            res.on("data", function (data) {content += data})
            res.on("end", function () {
                console.log(content)
                http.get(url3, (res)=>{
                    res.setEncoding('utf8')
                    res.on("error", function (error) {console.error(error)})
                    let content = ''
                    res.on("data", function (data) {content += data})
                    res.on("end", function () {
                        console.log(content)
                    })
                })
            })
        })
    })
})
