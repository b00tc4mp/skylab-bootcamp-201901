const logic = require('../../logic')
const nodemailer = require('nodemailer')

const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {
    const { userId } = req

    try {
      logic.sendInvitationEmail(userId)
        .then(result => res.json(result))
        .catch(error => handleResponseError(error, res))
    } catch (error) {
      handleResponseError(error, res)
    }
}