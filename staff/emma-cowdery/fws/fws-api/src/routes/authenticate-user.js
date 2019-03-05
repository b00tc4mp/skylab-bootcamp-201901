const logic = require('../logic')

const { createToken } = require('../token-helper')

module.exports = (req, res) => {
    const { body: { emailOrUsername, password } } = req

    try {
        logic.authenticateUser(emailOrUsername, password)
            .then(userId => {
                const token = createToken(userId)

                res.json({ token })
            })
            .catch(({ message }) => {
                res.status(409).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}