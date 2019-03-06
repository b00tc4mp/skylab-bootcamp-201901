const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, body: { product } } = req

    try {
        logic.createProduct(userId, product)
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