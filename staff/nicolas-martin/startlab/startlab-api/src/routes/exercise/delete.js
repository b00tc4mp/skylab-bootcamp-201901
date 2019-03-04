const logic = require('../../logic')

const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {

    const { params: { exerciseId }, userId } = req

    try {
        logic.deleteExercise(userId, exerciseId)
            .then(_res => res.json(_res))
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}

// OK
// {
//     "status": "ok",
//     "message": "exercise with id 5c7d356d9b638f451654589c deleted"
// }

// NOK - ID not found
// { "error": "exercise with id 5c77c4f06359ba34e89f82ed not found"}

// NOK - student
// { "error": "user with id 5c77c89209ad473de1078938 has not privileges" }