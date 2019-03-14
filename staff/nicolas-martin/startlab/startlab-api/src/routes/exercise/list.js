const logic = require('../../logic')

const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {

    try {
        logic.listExercises()
            .then(exercise => res.json(exercise))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}