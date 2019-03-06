const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, body: { data }, params: { id } } = req

    try {
        logic.updateProduct(userId, id, data)
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