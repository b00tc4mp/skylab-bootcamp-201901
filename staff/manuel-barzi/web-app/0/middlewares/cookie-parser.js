function cookieParser(req, res, next) {
    let raw = req.headers.cookie

    const keyValues = raw.split(';')

    const cookies = {}

    keyValues.forEach(keyValue => {
        const [key, value] = keyValue.split('=')

        cookies[key.trim()] = value.trim()
    })

    req.cookies = cookies

    next()
}

module.exports = cookieParser