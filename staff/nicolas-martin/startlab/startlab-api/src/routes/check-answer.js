const logic = require('../logic')

const { handleResponseError } = require('./route-helper')

module.exports = (req, res) => {

    const { body: { answer, exerciseId }, userId } = req

    const callback = result => {
        debugger
        return res.json(result)
    }

    try {
        logic.checkAnswer(userId, answer, exerciseId, callback)
    } catch (error) {
        handleResponseError(error, res)
    }
}