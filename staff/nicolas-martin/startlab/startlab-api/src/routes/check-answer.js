const logic = require('../logic')

const { handleResponseError } = require('./route-helper')

module.exports = (req, res) => {

    const { body: { answer, exerciseId }, userId } = req

    try {
        logic.checkAnswer(userId, answer, exerciseId)
            .then(result => res.json(result))
            .catch(error => handleResponseError(error, res)) // error when user is student
    } catch (error) {
        handleResponseError(error, res)
    }
}


// OK - all tests have passed
