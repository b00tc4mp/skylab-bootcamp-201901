const logic = require('../../logic')

const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {

    const { params: { invitationId }, userId } = req

    try {
        logic.retrieveInvitation(userId, invitationId)
            .then(invitation => res.json(invitation))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}
