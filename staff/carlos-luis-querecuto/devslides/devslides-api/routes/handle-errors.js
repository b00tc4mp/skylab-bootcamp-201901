const { LogicError, ValueError, RequirementError, UnknownError, UnauthorizedError } = require('../common/errors')

async function handleErrors(callback, res) {
    try {
        await callback()

        } catch (error) {
            let { status = 400, message } = error
            
            if (error instanceof LogicError) status = 409
            if (error instanceof UnknownError) status = 400
            if (error instanceof TypeError || error instanceof ValueError || error instanceof RequirementError) status = 406
            if (error instanceof UnauthorizedError) status = 401
            
            res.status(status).json({ error: message })
            
    }
}

module.exports = handleErrors