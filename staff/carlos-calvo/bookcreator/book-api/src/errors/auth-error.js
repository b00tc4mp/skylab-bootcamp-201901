'use strict'

class AuthError extends Error {
    constructor(messageOrError) {
        super(messageOrError)

        if (Error.captureStackTrace)
            Error.captureStackTrace(this, AuthError)
    }
}

module.exports = AuthError