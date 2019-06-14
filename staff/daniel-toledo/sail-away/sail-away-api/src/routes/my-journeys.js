const logic = require('../logic')

module.exports = (req, res) => {
    const { userId } = req

    try {
        return logic.myJourneys(userId)
            .then(journeys => res.json({ journeys }))

    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}