const { errors: { LogicError, ValueError, RequirementError, UnknownError, UnauthorizedError, FormatError }  } = require('cf-mce-common')

function handleErrors(callback, res) {
    try {
        callback()
            .catch(error => {
                let { status = 400, message } = error

                if (error instanceof LogicError) status = 409
                else if (error instanceof UnknownError) status = 400

                res.status(status).json({ error: message || 'unknown error' })
            })
    } catch (error) {
        const { message } = error

        let status = 400

        if (error instanceof TypeError || error instanceof ValueError || error instanceof RequirementError || error instanceof FormatError) status = 406
        else if (error instanceof UnauthorizedError) status = 401

        res.status(status).json({ error: message })
    }
}

module.exports = handleErrors