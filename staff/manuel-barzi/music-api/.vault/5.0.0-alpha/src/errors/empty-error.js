'use strict'

class EmptyError extends Error {
    constructor(messageOrError) {
        super(messageOrError)

        if (Error.captureStackTrace)
            Error.captureStackTrace(this, EmptyError)
    }
}

module.exports = EmptyError