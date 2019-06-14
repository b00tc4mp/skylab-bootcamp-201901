'use strict'

const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {
    const { userId, body: { droneId, orders } } = req

    try {
        logic.playProgram(userId, droneId, orders)
            .then(res.json.bind(res))
            .catch(err => handleResponseError(err, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}