function bodyParser(req, cb) {
    let body = ''

    req.on('data', data => body += data)

    req.on('end', () => {
        console.log(body)

        const keyValues = body.split('&')

        const params = keyValues.reduce((accum, keyValue) => {
            const [key, value] = keyValue.split('=')

            accum[key] = value

            return accum
        }, {})

        cb(params)
    })
}

module.exports = bodyParser