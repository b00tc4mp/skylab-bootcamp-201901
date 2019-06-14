const logic = require('../logic')

const { handleResponseError } = require('./route-helper')

module.exports = (req, res) => {
    const { userId } = req

    try {
        logic.getExercisesFromUser(userId)
            .then(exercises => res.json(exercises))
            .catch(error => handleResponseError(error, res)) // error when user is student
    } catch (error) {
        handleResponseError(error, res)
    }
}