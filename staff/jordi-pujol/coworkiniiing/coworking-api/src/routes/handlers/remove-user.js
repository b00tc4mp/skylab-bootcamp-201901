const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { email, password }, headers: { authorization } } = req

    const token = authorization.substring(7)

    try {
        logic.removeUser(token, email, password)
            .then(() => res.json({ }))
            .catch(({ message }) => {
                res.status(408).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}