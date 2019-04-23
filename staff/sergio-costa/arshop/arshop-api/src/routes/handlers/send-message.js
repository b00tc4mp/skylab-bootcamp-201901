const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, body: { text }, params: { id } } = req

    try {
        logic.sendMessage(userId, id, text)
            .then(id => res.json({id}))
            .catch(({ message }) => {
                res.status(401).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(401).json({
            error: message
        })
    }
}