// $ node . http://google.es http://google.it http://google.fr http://google.co.uk http://google.de

// WARN impl seems to be correct, but learnyounode complains randomly (TODO check it)

const http = require('http')

const { argv: [, , ...urls] } = process

const contents = []

urls.forEach((url, index) =>
    http.get(url, res => {
        res.setEncoding('utf8')

        res.on('error', err => { throw err })

        let content

        res.on('data', data => {
            content = (content || '') + data
        })

        res.on('end', () => {
            contents[index] = content

            if (contents.length === urls.length) {
                const ended = contents.every(content => !!content)

                ended && contents.forEach(content => console.log(content))
            }
        })
    })
)
