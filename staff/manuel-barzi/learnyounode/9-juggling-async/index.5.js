// $ node . http://google.es http://google.it http://google.fr

const http = require('http')
const async = require('async')

const { argv: [, , ...urls] } = process

async.map(urls, (url, cb) =>
    http.get(url, res => {
        res.setEncoding('utf8')

        res.on('error', err => cb(err))

        let content

        res.on('data', data => {
            content = (content || '') + data
        })

        res.on('end', () => cb(undefined, content))
    }),
    (err, contents) => {
        if (err) throw err

        contents.forEach(content => console.log(content))
    }
)