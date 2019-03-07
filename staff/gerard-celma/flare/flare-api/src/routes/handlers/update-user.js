const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req,res) => {
    const { userId, body: { name, surname, email, password, passwordConfirm } } = req

    try {
        logic.updateUser(userId, name, surname, email, password, passwordConfirm)
            .then(user => res.json(user))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}

