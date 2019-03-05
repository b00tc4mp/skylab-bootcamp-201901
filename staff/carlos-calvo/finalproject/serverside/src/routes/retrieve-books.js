const logic = require('../logic')

module.exports = (req, res) => {
    const { userId } = req

    try {
        logic.RetrieveBooks(userId)
            .then(res.json.bind(res))
    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}