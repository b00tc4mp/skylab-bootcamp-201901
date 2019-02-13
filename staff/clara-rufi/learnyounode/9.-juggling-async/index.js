const http = require('http')
const after = require('after')

const { argv: [, , ...urls] } = process

const next = after(urls.length, (err, contents) => {
    debugger

    if (err) throw err

    contents.forEach(content => console.log(content))
})

contents = []

urls.forEach((url, index) => {
    const req = http.get(url, res => {
        let content = ''

        res.on('data', chunk => content += chunk)

        res.on('end', () => {
            contents[index] = content   ///index?

            next(null, contents)
        })

        res.on('error', err => next(err))
    })

    req.on('error', err => next(err))
})


//npm install after
