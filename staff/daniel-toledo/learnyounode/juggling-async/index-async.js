
const { argv: [,, ...urls] } = process

const http = require('http')
const async = require('async')


async.map(urls, (url, cb) => {

    http.get(url, response => {
        let content = ''
        response.setEncoding("utf8").on('data', data => content += data)

        response.on('end', () => cb(null, content))
        response.on ('error', err => cb(err))
    })
}, (error, contents) =>{
    if (error) throw error

    contents.forEach(content => console.log(content))
})


