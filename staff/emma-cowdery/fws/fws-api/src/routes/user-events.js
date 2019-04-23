const logic = require('../logic')

module.exports = (req, res) => {
    const { userId } = req
    try {
        logic.userEvents(userId)
            .then(events => res.json({ events }))
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