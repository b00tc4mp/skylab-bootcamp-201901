const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req,res) => {
    const { userId } = req

    try {
        logic.removeUser(userId)
            .then(response => res.json(response))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}