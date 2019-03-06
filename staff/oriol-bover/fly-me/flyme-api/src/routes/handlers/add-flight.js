'use strict'

const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {
    const { userId, body: { droneId } } = req

    try {
        logic.addFlight(userId, droneId)
            .then(flightId => res.json({ flightId }))
            .catch(err => handleResponseError(err, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}