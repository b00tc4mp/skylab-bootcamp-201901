// $ node . http://google.es http://google.it http://google.fr

const http = require('http')
const after = require('after')

const { argv: [, , ...urls] } = process

const next = after(urls.length, (err, contents) => {
    if (err) throw err

    contents.forEach(content => console.log(content))
})

const contents = []

urls.forEach((url, index) =>
    http.get(url, res => {
        res.setEncoding('utf8')

        res.on('error', err => next(err))

        let content

        res.on('data', data => {
            content = (content || '') + data
        })

        res.on('end', () => {
            contents[index] = content

            next(undefined, contents)
        })
    })
)