const querystring = require('querystring')

function bodyParser(req, res, next) {
    let raw = ''

    req.on('data', data => raw += data)

    req.on('end', () => {
        raw = querystring.unescape(raw)

        const keyValues = raw.split('&')

        const body = {}

        keyValues.forEach(keyValue => {
            const [key, value] = keyValue.split('=')

            body[key] = value
        })

        req.body = body

        next()
    })
}

module.exports = bodyParser