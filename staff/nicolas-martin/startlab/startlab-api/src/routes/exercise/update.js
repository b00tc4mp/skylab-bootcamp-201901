const logic = require('../../logic')

const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {

    const { body: { title, summary, test, id, order }, userId } = req

    const exercise = { title, summary, test, id, order }

    try {
        logic.updateExercise(userId, exercise)
            .then(_res => res.json(_res))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}


// OK
// {
//     "status": "ok",
//     "message": "exercise with id 5c77be22e1fb9d30c30ddafe updated"
// }

// NOK - id not found
// { "error": "exercise with 5c77be22e1fb9d30c30ddaff not found" }

// NOK - malformed id
// { "error": "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters" }

