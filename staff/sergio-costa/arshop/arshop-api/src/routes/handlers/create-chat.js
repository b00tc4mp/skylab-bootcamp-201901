const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, params: { id } } = req

    try {
        logic.createChat(userId, id)
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