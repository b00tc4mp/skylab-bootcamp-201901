'use strict'

const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {
    const { userId, body: { name, orders } } = req

    try {
        logic.addProgram(userId, name, orders)
            .then(programId => res.json({ programId }))
            .catch(err => handleResponseError(err, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}