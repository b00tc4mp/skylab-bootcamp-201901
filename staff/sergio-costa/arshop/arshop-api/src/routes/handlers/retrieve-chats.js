const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId } = req

    try {
        logic.retrieveChats(userId)
            .then(chats => res.json(chats))
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