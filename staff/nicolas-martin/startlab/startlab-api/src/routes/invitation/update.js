const logic = require('../../logic')

const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {

    const { body: { id, email, status }, userId } = req

    const invitation = { id, email, status }

    try {
        logic.updateInvitation(userId, invitation)
            .then(_res => res.json(_res))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}