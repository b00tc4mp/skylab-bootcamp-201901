const http = require('http')

const { argv: [, , url] } = process

http.get(url, res => {
    res.setEncoding('utf8')

    res.on('error', error => { throw error })

    let content = ''

    res.on('data', data => content += data)

    res.on('end', () => console.log(`${content.length}\n${content}`))
})