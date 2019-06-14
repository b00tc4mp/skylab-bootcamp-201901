'use strict'

const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {
    const { userId, body: { brand, model, host, port } } = req

    try {
        logic.addDrone(userId, brand, model, host, port)
            .then(droneId => res.json({ droneId }))
            .catch(err => handleResponseError(err, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}