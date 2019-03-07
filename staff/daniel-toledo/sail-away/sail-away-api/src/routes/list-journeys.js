const logic = require('../logic')

module.exports = (req, res) => {

    try {
        return logic.listJourneys()
            .then(journeys => res.json({ journeys }))

    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}