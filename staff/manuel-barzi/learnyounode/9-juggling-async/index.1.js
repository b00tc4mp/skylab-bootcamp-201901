// $ node . http://google.es http://google.it http://google.fr

const http = require('http')

const { argv: [, , ...urls] } = process

const contents = new Array(urls.length)

contents.fill('') // ['', '', '']

let count = 0

urls.forEach((url, index) =>
    http.get(url, res => {
        res.setEncoding('utf8')

        res.on('error', err => { throw err })

        res.on('data', data => contents[index] += data)

        res.on('end', () => {
            if(++count === urls.length) contents.forEach(content => console.log(content))
        })
    })
)
