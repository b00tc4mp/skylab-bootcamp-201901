'use strict'

const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {

    const { userId } = req

    try {
        logic.retrieveUser(userId)
            .then(res.json.bind(res))
            .catch(error => handleResponseError(error, res))
    } catch ({ message }) {
        handleResponseError(error, res)
    }

}