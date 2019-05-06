const http = require('http')

const { argv: [, , url] } = process

http.get(url, res => {
    bl(res, (error, content) => {
        if (error) throw error

        console.log(`${content.length}\n${content}`)
    })
})

function bl(res, cb) {
    res.setEncoding('utf8')

    res.on('error', error => cb(error))

    let content = ''

    res.on('data', data => content += data)

    res.on('end', () => cb(undefined, content))
}