const logic = require('../logic')

const { handleResponseError } = require('./route-helper')

module.exports = (req, res) => {

    const { body: { name, surname, email, password, passwordConfirm } } = req

    try {
        logic.registerUser(name, surname, email, password, passwordConfirm)
            .then(id => res.json({ id }))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}

// OK
// {"id": "5c77c89209ad473de1078938"}

// NOK
// {"error": "password cannot be empty"}

// NOK
// {"error": "password and password confirmation does not match"}

// NOK
// {"error": "user with email student100@student100.com already exists"}