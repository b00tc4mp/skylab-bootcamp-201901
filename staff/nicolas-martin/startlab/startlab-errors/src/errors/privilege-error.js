'use strict'

class PrivilegeError extends Error {
    constructor(messageOrError) {
        super(messageOrError)

        if (Error.captureStackTrace)
            Error.captureStackTrace(this, PrivilegeError)
    }
}

module.exports = PrivilegeError