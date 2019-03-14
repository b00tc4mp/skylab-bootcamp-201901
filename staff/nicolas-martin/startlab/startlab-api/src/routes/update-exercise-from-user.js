const logic = require('../logic')
const { handleResponseError } = require('./route-helper')

module.exports = (req, res) => {

    const { userId, body: { historicalId, answer } } = req

    try {
        logic.updateExerciseFromUser(userId, historicalId, answer)
            .then(result => res.json(result))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}