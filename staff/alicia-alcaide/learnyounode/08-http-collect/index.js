// Option 1

const http = require('http')
const { argv: [, , url] } = process

http.get(url, res => {
    res.setEncoding('utf8')
    res.on('error', error => { throw error })
    let content = ''
    res.on('data', data => content += data)
    res.on('end', () => console.log(`${content.length}\n${content}`))
})


// Option 2
/*
const http = require('http')
const bl = require('bl')
const { argv: [, , url] } = process

http.get(url, res => {
    res.pipe(bl((error, content) => {
        if (error) throw error

        console.log(`${content.length}\n${content}`)
    }))
})
*/
