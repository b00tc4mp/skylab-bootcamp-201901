var http = require('http')

http.get(process.argv[2], (res) => {
    let result = ''
    let result2 = ''
    let result3 = ''
    res.setEncoding('utf8').on('data', (data) => {
        result += data
    })
    res.on('end', () => {
        console.log(result)
        http.get(process.argv[3], (res2) => {
            res2.setEncoding('utf8').on('data', (data2) => {
                result2 += data2
            })
            res2.on('end', () => {
                console.log(result2)
                http.get(process.argv[4], (res3) => {
                    res3.setEncoding('utf8').on('data', (data3) => {
                        result3 += data3
                    })
                    res3.on('end', () => console.log(result3))
                })
            })
        })
    })
})