'use strict'

const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {



    const { body: { name, surname, email, password, passwordConfirmation } } = req

    try {
        logic.registerUser(name, surname, email, password, passwordConfirmation)
            .then(id => res.json({ id }))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }

}