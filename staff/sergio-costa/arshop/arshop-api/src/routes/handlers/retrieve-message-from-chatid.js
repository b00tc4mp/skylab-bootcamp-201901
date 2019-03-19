const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId, params: { id }} = req

    try {
        logic.retrieveMessagesFromChat(userId, id)
            .then(messages => res.json(messages))
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