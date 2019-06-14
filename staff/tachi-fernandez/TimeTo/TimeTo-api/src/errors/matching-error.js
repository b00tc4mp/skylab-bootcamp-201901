
'use strict'

class MatchingError extends Error {
    constructor(messageOrError) {
        super(messageOrError)

        if (Error.captureStackTrace)
            Error.captureStackTrace(this, MatchingError)
    }
}

module.exports = MatchingError