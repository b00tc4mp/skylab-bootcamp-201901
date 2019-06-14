const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { id } } = req

    try {
        logic.retrieveUserFromProducts(id)
            .then(res.json.bind(res))
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