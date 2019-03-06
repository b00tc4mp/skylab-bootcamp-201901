'use strict'

const { AuthError, DuplicateError, EmptyError, MatchingError, NotFoundError } = require('music-errors')

module.exports = {
    handleResponseError(error, res) {
        let status = 400

        if (error instanceof NotFoundError)
            status = 404
        else if (error instanceof TypeError || error instanceof EmptyError || error instanceof MatchingError)
            status = 412
        else if (error instanceof AuthError)
            status = 401
        else if (error instanceof DuplicateError)
            status = 409
        else
            status = 500

        res.status(status).json({
            error: error.message
        })
    }
}