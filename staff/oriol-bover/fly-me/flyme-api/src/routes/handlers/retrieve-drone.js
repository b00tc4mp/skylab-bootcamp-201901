'use strict'

const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {

    const { userId, params: { droneId } } = req

    try {
        logic.retrieveDroneFromId(userId, droneId)
            .then(res.json.bind(res))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}