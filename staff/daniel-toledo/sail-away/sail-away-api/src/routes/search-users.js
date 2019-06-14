const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { talents, languages } } = req

    try {
        return logic.searchUsers(talents, languages )
            .then(users => res.json(users))

    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}