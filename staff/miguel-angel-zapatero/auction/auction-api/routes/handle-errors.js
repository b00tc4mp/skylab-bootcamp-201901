const { LogicError, ValueError, RequirementError, UnauthorizedError } = require('auction-errors') 

async function handleErrors(callback, res) {
    try {
        await callback()
    } catch (error) {
        const { message } = error

        let status = 400

        if (error instanceof LogicError) status = 409

        if (error instanceof TypeError || error instanceof ValueError || error instanceof RequirementError) status = 406
        else if (error instanceof UnauthorizedError) status = 401

        if(error.name === 'MongoNetworkError') status = 503

        res.status(status).json({ error: message })
    }
}

module.exports = handleErrors