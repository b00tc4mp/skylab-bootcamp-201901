const logic = require('../../logic')

const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {

    const { body: { title, summary, test, theme, order }, userId } = req

    try {
        logic.createExercise(userId, title, summary, test, theme, order)
            .then(response => res.json(response))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}