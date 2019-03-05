const logic = require('../logic')

const { handleResponseError } = require('./route-helper')

module.exports = (req, res) => {
    const { userId } = req

    try {
        logic.isAdmin(userId)
            .then(result => res.json(result))
            //.then(res.json.bind(res))
            .catch(error => handleResponseError(error, res)) // error when user is student

    } catch (error) {
        handleResponseError(error, res)
    }
}