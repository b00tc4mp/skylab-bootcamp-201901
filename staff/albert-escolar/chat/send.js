const http = require('http')


const { argv: [, , address, message] } = process


const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
        'COntent-Length': message.length
    }
}

const request = http.request(`http://${address}`, options, response => {

    response.setEncoding('utf8')

    response.on('error', error => { throw error })

    let content = ''

    response.on('data', chunk => content += chunk)

    response.on('end', () => {
        console.log(content)
        console.log(`${response.statusCode}OK!`)
    })

})

request.write(message)
request.end()