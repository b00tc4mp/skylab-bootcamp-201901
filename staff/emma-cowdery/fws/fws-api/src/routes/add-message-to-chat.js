const logic = require('../logic')

module.exports = (req, res) => {
    const { userId, params: { chatId }, body: { text } } = req
    try {
        logic.userChats(userId, chatId, text)
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