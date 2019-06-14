'use strict'

class DataError extends Error {
    constructor(messageOrError) {
        super(messageOrError)

        if (Error.captureStackTrace)
            Error.captureStackTrace(this, DataError)
    }
}

module.exports = DataError