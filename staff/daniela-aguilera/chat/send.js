const http = require('http')
const { argv: [, , url, message] } = process

// const formData = JSON.stringify({ message })

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
        'Content-Length': message.length
    }
}

const request = http.request(`http://${url}`, options, res => {

    res.setEncoding('utf8')

    res.on('error', error => { throw error })

    let content = ''
    res.on('data', chunk => content += chunk)

    res.on('end', () => {
        console.log(content)
        console.log(`${res.statusCode} OK!`)
    })
})

request.write(message)
request.end()



