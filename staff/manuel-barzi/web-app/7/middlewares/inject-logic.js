const Logic = require('../logic')

function injectLogic(req, res, next) {
    const { session: { token } } = req

    const logic = new Logic(token)

    req.logic = logic

    next()
}

module.exports = injectLogic