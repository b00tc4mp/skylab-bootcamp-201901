'use strict'

const { AuthError, DuplicateError, EmptyError, MatchingError, NotFoundError, PrivilegeError, CodeError } = require('../../errors')

module.exports = {
    handleResponseError(error, res) {
        let status = 400
        if (error instanceof NotFoundError)
            status = 404 //Not Found
        else if (error instanceof TypeError || error instanceof EmptyError || error instanceof MatchingError)
            status = 412 // Precondition Failed
        else if (error instanceof AuthError || error instanceof PrivilegeError)
            status = 401 // Unauthorized 
        else if (error instanceof DuplicateError)
            status = 409 // Conflict
        else if (error instanceof CodeError)
            status = 200
        else
            status = 500 // Internal Server Error

        res.status(status).json({
            error: error.message
        })
    }
}