const http = require('http')
const async = require('async')

const { argv: [, , ...urls] } = process

async.map(urls, (url, cb) => 
    http.get(url, (res) => {
        res.setEncoding('utf8')
        
        res.on('error', err => cb(err))
        
        let content
        res.on('data', data => {
            content = (content || '') + data
        })

        res.on('end', () => cb(undefined, content))
    }),
    (error, contents) => {
        if(error) throw error
        contents.forEach(content => console.log(content))
    }
)