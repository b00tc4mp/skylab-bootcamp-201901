'use strict'

const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {

    const { userId, body: { droneId, command } } = req

    try {
        logic.sendDroneCommand(userId, droneId, command)
            .then(res.json.bind(res))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}