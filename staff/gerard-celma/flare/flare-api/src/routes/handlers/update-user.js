const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req,res) => {
    const { userId, body: { name, surname, email } } = req

    try {
        logic.updateUser(userId, name, surname, email)
            .then(user => res.json(user))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}

