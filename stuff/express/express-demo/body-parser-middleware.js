function bodyParser(req, res, next) {
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

        req.params = params

        next()
    })
}

module.exports = bodyParser