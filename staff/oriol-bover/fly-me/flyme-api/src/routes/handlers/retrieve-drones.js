'use strict'

const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {

    try {
        logic.retrieveDrones()
            .then(res.json.bind(res))
            .catch(err => handleResponseError(err, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}