const logic = require('../logic')

const { createToken } = require('../token-helper')
const { handleResponseError } = require('./route-helper')

module.exports = (req, res) => {
    const { body: { email, password } } = req

    try {
        logic.authenticateUser(email, password)
            // .then(data => res.json(data))
            .then(userId => {
                const token = createToken(userId)
                debugger
                res.json({ token })
            })
            .catch(error => handleResponseError(error, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}

// OK
// {
//     "token": "eyJhbGciOiJIUzI1Ni..."
// }


// NOK
// {
//     "error": "wrong credentials"
// }