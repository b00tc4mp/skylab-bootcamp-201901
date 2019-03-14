const http = require('http')
const async = require('async')

const { argv: [, , ...urls] } = process

async.map(urls, (url, cb) => {
    http.get(url, res => {
        let content = ''

        res.on('data', chunk => content += chunk)

        res.on('end', () => cb(null, content))

        res.on('error', err => cb(err))
    })
}, (err, contents) => {
    if (err) throw err

    contents.forEach(content => console.log(content))
})

