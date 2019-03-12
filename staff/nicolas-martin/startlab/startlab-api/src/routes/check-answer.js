const logic = require('../logic')

const { handleResponseError } = require('./route-helper')

module.exports = (req, res) => {

    const { body: { answer, exerciseId }, userId } = req

    const callback = result => res.json(result)

    try {
        logic.checkAnswer(userId, answer, exerciseId, callback)
                // .then(result => {
                //     console.log('handler:', result)
                //     return res.json(result)
                // })
                // .catch(error => handleResponseError(error, res))

        // console.log('handler', result)
        // debugger
        // res.json(result)
            // .then(result => res.json(result))
            // .catch(error => handleResponseError(error, res)) // error when user is student
    } catch (error) {
        handleResponseError(error, res)
    }
}


// OK - all tests have passed
