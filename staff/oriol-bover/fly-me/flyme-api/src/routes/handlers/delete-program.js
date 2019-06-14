'use strict'

const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {

    const { userId, body: { programId } } = req

    try {
        logic.deleteProgram(userId, programId)
            .then(res.json.bind(res))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}