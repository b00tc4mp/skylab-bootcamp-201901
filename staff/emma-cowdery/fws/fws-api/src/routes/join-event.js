const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { eventId }, userId } = req

    try {
        logic.joinEvent(eventId, userId)
            .then(event => res.json({ event }))
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