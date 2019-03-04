'use strict'

class AuthError extends Error {
    constructor(messageError) {
        super(messageError)

        if (Error.captureStackTrace) Error.captureStackTrace(this, AuthError)
    }
}

module.exports = AuthError