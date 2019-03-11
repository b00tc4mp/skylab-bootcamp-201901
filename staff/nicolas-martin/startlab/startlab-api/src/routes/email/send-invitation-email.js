const logic = require('../../logic')

const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {
  const { body: { id: invitationId, email }, userId } = req

  try {
    logic.sendInvitationEmail(userId, email, invitationId)
      .then(_res => res.json(_res))
      .catch(error => handleResponseError(error, res))
  } catch (error) {
    handleResponseError(error, res)
  }
}