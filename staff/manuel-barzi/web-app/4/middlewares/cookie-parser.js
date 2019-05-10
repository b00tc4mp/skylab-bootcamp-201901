function cookieParser(req, res, next) {
    const cookies = {}

    let raw = req.headers.cookie

    if (raw) {

        const keyValues = raw.split(';')


        keyValues.forEach(keyValue => {
            const [key, value] = keyValue.split('=')

            cookies[key.trim()] = value.trim()
        })

    }

    req.cookies = cookies

    next()
}

module.exports = cookieParser