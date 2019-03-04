const logic = require('../../logic')

const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {
 
    const { userId } = req

    try {
        logic.listExercises(userId)
            .then(exercise => res.json(exercise))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}