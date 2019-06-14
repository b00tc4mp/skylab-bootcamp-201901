const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { chatId }, userId } = req

    try {
        logic.joinChat(chatId, userId)
            .then(chat => res.json({ chat }))
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