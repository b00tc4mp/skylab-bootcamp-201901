const logic = require('../../logic')

const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {

    const { params: { exerciseId }, userId } = req

    try {
        logic.deleteExercise(userId, exerciseId)
            .then(_res => res.json(_res))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}