const Logic = require('../logic')
const Root = require('../components/root')

function injectLogic(req, res, next) {
    const { cookies: { token, language } } = req

    const logic = new Logic(token, language)

    req.logic = logic
    req.root = new Root(req.logic)

    next()
}

module.exports = injectLogic