const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {
    const { userId, body: { userIdTo, launchDate, position, text } } = req
    
    try {
        logic.createMessage(userId, userIdTo, launchDate, position, text)
            .then(message => res.json(message))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}