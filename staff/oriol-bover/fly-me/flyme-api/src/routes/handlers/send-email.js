'use strict'

const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {
    const { userId, body: { subject, message, type } } = req

    try {
        logic.sendMail(userId, { subject, message })
            .then(res.json.bind(res))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}