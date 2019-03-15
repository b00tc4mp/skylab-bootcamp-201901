const http = require('http')

const { argv: [, , ...urls] } = process

function printUrlResponse(urls, index = 0) {
    http.get(urls[index], res => {
        let content = ''

        res.on('data', chunk => content += chunk)

        res.on('end', () => {
            console.log(content)

            // if (index < urls.length) printUrlResponse(urls, ++index) // GHOST! <html><body><h1>It works!</h1></body></html>
            if (index < urls.length - 1) printUrlResponse(urls, ++index)
        })
    })
}

printUrlResponse(urls)
