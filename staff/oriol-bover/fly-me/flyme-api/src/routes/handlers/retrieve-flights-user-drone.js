'use strict'

const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {

    const { params: { userId, droneId } } = req

    try {
        logic.retrieveFlightsFromUserDrone(userId, droneId)
            .then(res.json.bind(res))
            .catch(err => handleResponseError(err, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}