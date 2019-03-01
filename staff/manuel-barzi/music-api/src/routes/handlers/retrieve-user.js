const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {
    const { userId } = req

    try {
        logic.retrieveUser(userId)
            // .then(user => res.json(user))
            .then(res.json.bind(res))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}