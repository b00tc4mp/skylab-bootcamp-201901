'use strict'

class CodeError extends Error {
    constructor(messageOrError) {
        super(messageOrError)

        if (Error.captureStackTrace)
            Error.captureStackTrace(this, MatchingError)
    }
}

module.exports = CodeError