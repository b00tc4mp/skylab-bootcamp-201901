const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { username, email, password, passwordConfirm } } = req

    try {
        logic.registerUser(username, email, password, passwordConfirm)
            .then(id => res.json({ id }))
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