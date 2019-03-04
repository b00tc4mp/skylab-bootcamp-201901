const logic = require('../logic')

const { handleResponseError } = require('./route-helper')

module.exports = (req, res) => {

    const { body: { code, test }, userId } = req

    try {
        let result = logic.checkCode(userId, code, test)
        res.json({ status: 'ok' })
    } catch (error) {
        handleResponseError(error, res)
    }
}


// OK - all tests have passed
