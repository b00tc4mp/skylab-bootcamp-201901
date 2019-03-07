const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {
    const { userId, body: { msgId } } = req

    try {
        logic.messageDelete(userId, msgId)
            .then(response => res.json(response))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}

