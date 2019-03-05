'use strict'

const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {
    const { body: { userId, identifier, brand, model } } = req

    try {
        logic.addDrone(userId, identifier, brand, model)
            .then(droneId => res.json({ droneId }))
            .catch(err => handleResponseError(err, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}