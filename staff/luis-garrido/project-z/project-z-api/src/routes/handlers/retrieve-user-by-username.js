const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { username } } = req

    try {
        logic.retrieveUserByUsername(username)
            .then(user => res.json(user))
            .catch(({ message }) => {
                res.status(404).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(404).json({
            error: message
        })
    }
}