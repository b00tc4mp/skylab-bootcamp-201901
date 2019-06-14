const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { userId } } = req

    try {
        logic.retrieveUser(userId)
            .then(user => res.json({ user }))
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