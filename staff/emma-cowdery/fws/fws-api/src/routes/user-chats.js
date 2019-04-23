const logic = require('../logic')

module.exports = (req, res) => {
    const { userId } = req
    try {
        logic.userChats(userId)
            .then(chats => res.json({ chats }))
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