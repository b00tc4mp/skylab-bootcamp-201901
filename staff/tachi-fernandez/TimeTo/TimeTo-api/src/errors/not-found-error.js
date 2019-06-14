
'use strict'

class NotFoundError extends Error {
    constructor(messageOrError) {
        super(messageOrError)

        if (Error.captureStackTrace)
            Error.captureStackTrace(this, NotFoundError)
    }
}

module.exports = NotFoundError