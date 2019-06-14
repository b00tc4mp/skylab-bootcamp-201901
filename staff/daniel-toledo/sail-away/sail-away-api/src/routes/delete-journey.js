const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { id } } = req

    try {
        return logic.deleteJourney(id)
            .then(journey => res.json({ journey }))

    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}