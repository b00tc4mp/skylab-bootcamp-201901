const logic = require('../../logic')

const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {

    const { body: { email }, userId } = req

    try {
        logic.createInvitation(userId, email)
            .then(response => res.json(response))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}


// OK
// { "id": "5c77c4f06359ba34e89f82ee"}

// Empty title
// {"error": "title is empty" }

// NOK - student
// {"error": "user with id 5c77c89209ad473de1078938 has not privileges"}