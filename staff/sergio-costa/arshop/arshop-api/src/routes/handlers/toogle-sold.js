const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, params: { id } } = req

    try {
        logic.toogleSold(userId, id)
            .then(result => res.json(result))
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