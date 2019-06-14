const logic = require('../../logic')

module.exports = (req, res) => {

    try {
        logic.retrieveProducts()
            .then(products => res.json(products))
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