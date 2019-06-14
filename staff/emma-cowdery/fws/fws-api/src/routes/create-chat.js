const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { chatName }, params: { eventId }, userId } = req

    try {
        logic.createChat(userId, chatName, eventId)
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