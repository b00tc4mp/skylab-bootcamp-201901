const { FormatError } = require ('../errors')
const atob = require('atob')

const token = {
    payload(token) {
        const [, rawPayload] = token.split('.')
       
        if (!rawPayload) throw new FormatError('invalid token')

        return JSON.parse(atob(rawPayload))
    }
}

module.exports = token