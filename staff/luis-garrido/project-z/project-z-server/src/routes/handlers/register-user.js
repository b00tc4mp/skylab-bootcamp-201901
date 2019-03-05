'use strict'

const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {
    const { body: { admin, username, avatar, name, surname, email, password, passwordConfirm } } = req

    try {
        logic.registerUser(admin, username, avatar, name, surname, email, password, passwordConfirm)
            .then(id => res.json({ id }))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}