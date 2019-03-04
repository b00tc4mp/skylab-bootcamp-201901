'use strict'

const logic = require('../../logic')
const { createToken } = require('../../token-helper')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {

    const { body: { email, password } } = req

    try {

        logic.authenticateUser(email, password)
            .then(({ id }) => {
                const token = createToken(id)

                res.json({ token })
            })
            .catch(error => handleResponseError(error, res))

    } catch ({ message }) {
        handleResponseError(error, res)
    }

}