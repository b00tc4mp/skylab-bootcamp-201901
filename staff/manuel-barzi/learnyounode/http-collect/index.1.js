const http = require('http')

const { argv: [, , url] } = process

http.get(url, res => {
    let content = ''

    res.on('data', chunk => content += chunk)

    res.on('end', () => console.log(`${content.length}\n${content}`))
})