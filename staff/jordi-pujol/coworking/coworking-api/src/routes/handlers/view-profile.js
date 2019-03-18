const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, params: { username } } = req

    try {
        logic.retrieveUserProfile(userId, username)
            .then(user => res.json(user))
            .catch(({ message }) => {
                res.status(400).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}