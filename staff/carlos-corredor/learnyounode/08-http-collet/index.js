const http = require('http')
const url = process.argv[2]
const bl = require('bl')

http.get(url, (res)=>{
    res.pipe(bl(function (error, data) {
        if(error) throw error
        console.log(data.length + '\n' + data)
    }))
})

// http.get(url, res => {
//     res.setEncoding('utf8')

//     res.on('error', error => { throw error })

//     let content = ''

//     res.on('data', data => content += data)

//     res.on('end', () => console.log(`${content.length}\n${content}`))
// })