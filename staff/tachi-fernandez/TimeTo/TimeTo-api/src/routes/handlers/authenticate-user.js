const logic = require('../../logic')
const { createToken } = require('../../token-helper')


module.exports = (req, res) => {
    const { body: { email, password } } = req

    try {
        logic.authenticateUser(email, password)
            .then(userId => {
                const token = createToken(userId)
                res.json({ token })
            })
            .catch(({ message }) => {
                res.status(401).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}