'use strict'

class DuplicateError extends Error {
    constructor(messageOrError) {
        super(messageOrError)

        if (Error.captureStackTrace)
            Error.captureStackTrace(this, DuplicateError)
    }
}

module.exports = DuplicateError