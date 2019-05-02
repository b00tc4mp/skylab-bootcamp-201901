const logic = require('../../logic')

const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {

    const { params: { exerciseId }, headers: { authorization }, userId } = req

    try {
        logic.retrieveExercise(userId, exerciseId)
            .then(exercise => res.json(exercise))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}

// OK
// {
//     "order": 0,
//     "title": "Declaring variables",
//     "summary": "...",
//     "test": "expect(x).to.equal(10)",
//     "id": "5c7d35319b638f451654589b"
// }

// NOK - exerciseId not found
// { "error": "exercise not found" }

// NOK - student
// { "error": "user with id 5c77c89209ad473de1078938 has not privileges" }
