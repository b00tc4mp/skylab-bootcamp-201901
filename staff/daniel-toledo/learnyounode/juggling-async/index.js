
const { argv } = process

var http = require('http')

function printUrlsData(urls, index) {
    let result = ''
    http.get(urls[index], response => {
        response.setEncoding("utf8").on('data', data => result += data)

        response.on('end', () => {
            console.log(result)

            if (index < urls.length) printUrlsData(urls, ++index)

        })
    })
}

printUrlsData(argv.slice(2), 0)


