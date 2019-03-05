const logic = require('../logic')

module.exports = (req, res) => {
    const {params: { id }} = req

    try {
        logic.retrieveBook(id)
            .then(res.json.bind(res))
    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}