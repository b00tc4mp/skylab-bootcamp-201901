const logic = require('../../logic')

module.exports = (req, res) => {
    const { query: { q } } = req

    try {
        logic.searchProducts(q)
            .then(product => res.json(product))
            .catch(({ message }) => {
                res.status(400).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}