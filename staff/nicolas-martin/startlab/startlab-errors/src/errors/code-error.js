'use strict'

class CodeError extends Error {
    constructor(messageOrError) {
        super(messageOrError)

        if (Error.captureStackTrace)
            Error.captureStackTrace(this, CodeError)
    }
}

module.exports = CodeError