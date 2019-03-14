
const { argv: [,, ...urls] } = process

const http = require('http')
const after = require('after')

const next = after(urls.length, (err, contents)=>{
    if (err) throw err

    contents.forEach(content => console.log(content))
})

let contents=[]

urls.forEach((url, index) => {
    http.get(url, response => {
        let content = ''
        response.setEncoding("utf8").on('data', data => content += data)

        response.on('end', () => {
            contents[index]=content
            next(null, contents)
        })
        response.on ('error', err => next(err))
    })
})



