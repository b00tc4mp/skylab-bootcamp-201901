const logic = require('../logic')

module.exports = (req, res) => {
    const { userId, params: { chatId } } = req
    
    try {
        logic.messagesFromChat(userId, chatId)
            .then(messages => res.json({ messages }))
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